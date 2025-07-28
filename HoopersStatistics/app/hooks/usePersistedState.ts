// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// const usePersistedState = <T,>(key: string, defaultValue: T): [T, (value: T) => void, boolean] => {
//     const [state, setState] = useState<T>(defaultValue);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const savedValue = await AsyncStorage.getItem(key);
//                 if (savedValue !== null) {
//                     setState(JSON.parse(savedValue));
//                 }
//             } catch (error) {
//                 console.error('Erro ao carregar dados:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         loadData();
//     }, [key]);
//
//     useEffect(() => {
//         if (!loading) {
//             const saveData = async () => {
//                 try {
//                     await AsyncStorage.setItem(key, JSON.stringify(state));
//                 } catch (error) {
//                     console.error('Erro ao salvar dados:', error);
//                 }
//             };
//
//             saveData();
//         }
//     }, [state, key, loading]);
//
//     return [state, setState, loading];
// };
//
// export default usePersistedState;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const usePersistedState = <T,>(
    key: string,
    defaultValue: T
): [T, (value: T) => Promise<void>, boolean] => {
    const [state, setState] = useState<T>(defaultValue);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedValue = await AsyncStorage.getItem(key);
                if (savedValue !== null) {
                    setState(JSON.parse(savedValue));
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [key]);

    const updateState = async (newValue: T) => {
        try {
            setState(newValue);
            await AsyncStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    };

    return [state, updateState, loading];
};
export default usePersistedState;
