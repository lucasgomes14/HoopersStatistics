import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from "axios";
import { Platform } from 'react-native';

// Configuração da URL base para diferentes ambientes
const getApiUrl = () => {
    if (__DEV__) {
        return Platform.OS === 'android'
            ? 'http://10.0.2.2:3000'  // Android emulator
            : 'http://localhost:3000'; // iOS simulator
    }
};

const API_URL = getApiUrl();

interface SyncQueueItem {
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    entityType: 'players' | 'matches';
    data?: any;
    id?: number | string;
}

export class SyncService {
    private static queue: SyncQueueItem[] = [];
    private static isOnline = false;
    private static isProcessing = false;

    static async init() {
        // Carrega fila existente
        try {
            const savedQueue = await AsyncStorage.getItem('syncQueue');
            if (savedQueue) {
                this.queue = JSON.parse(savedQueue);
            }
        } catch (error) {
            console.error('Erro ao carregar fila:', error);
        }

        // Configura listener de rede
        NetInfo.addEventListener(state => {
            this.isOnline = state.isConnected ?? false;
            if (this.isOnline) {
                this.processQueue();
            }
        });

        // Verifica status inicial
        const initialState = await NetInfo.fetch();
        this.isOnline = initialState.isConnected ?? false;
        if (this.isOnline) {
            this.processQueue();
        }
    }

    static async addToQueue(item: SyncQueueItem) {
        this.queue.push(item);
        await this.saveQueue();
        if (this.isOnline && !this.isProcessing) {
            this.processQueue();
        }
    }

    private static async saveQueue() {
        try {
            await AsyncStorage.setItem('syncQueue', JSON.stringify(this.queue));
        } catch (error) {
            console.error('Erro ao salvar fila:', error);
        }
    }

    private static async processQueue() {
        if (!this.isOnline || this.queue.length === 0 || this.isProcessing) return;

        this.isProcessing = true;

        try {
            while (this.queue.length > 0) {
                const item = this.queue[0];
                try {
                    await this.syncItem(item);
                    this.queue.shift();
                    await this.saveQueue();
                } catch (error) {
                    console.error(`Erro ao sincronizar item:`, {
                        type: item.type,
                        entity: item.entityType,
                        error: error.message,
                        stack: error.stack
                    });
                    break;
                }
            }
        } finally {
            this.isProcessing = false;
        }
    }

    private static async syncItem(item: SyncQueueItem) {
        try {
            const config = {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            switch (item.type) {
                case 'CREATE':
                    await axios.post(`${API_URL}/${item.entityType}`, item.data, config);
                    break;
                case 'UPDATE':
                    await axios.patch(
                        `${API_URL}/${item.entityType}/${item.id}`,
                        item.data,
                        config
                    );
                    break;
                case 'DELETE':
                    await axios.delete(
                        `${API_URL}/${item.entityType}/${item.id}`,
                        config
                    );
                    break;
            }
        } catch (error) {
            if (error.response) {
                // Erro do servidor (4xx, 5xx)
                console.error('Erro do servidor:', {
                    status: error.response.status,
                    data: error.response.data,
                    url: error.config.url
                });
            } else if (error.request) {
                // Não houve resposta do servidor
                console.error('Sem resposta do servidor:', {
                    url: error.config.url,
                    method: error.config.method
                });
            } else {
                // Erro na configuração da requisição
                console.error('Erro na requisição:', error.message);
            }
            throw error;
        }
    }
}

// Inicialização segura
SyncService.init().catch(error => {
    console.error('Falha na inicialização do SyncService:', error);
});
