import React, {createContext, useContext} from 'react';
import usePersistedState from '@/hooks/usePersistedState';
import {Player} from "@/types/Player";

interface PlayersContextType {
    players: Player[],
    addPlayer: (name: string) => void;
    removePlayer: (id: number) => void,
    updatePlayerStats: (
        id: number,
        stats: {
            points?: number;
            assist?: number;
            rebound?: number;
        }
    ) => void;
    loading: boolean;
}

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const PlayersProvider = ({ children }: { children: React.ReactNode }) => {
    const [players, setPlayers, loading] = usePersistedState<Player[]>('players', []);

    const addPlayer = (name: string) => {
        const newId = players.length === 0 ? 1 : Math.max(...players.map(p => p.id)) + 1;
        const newPlayer: Player = {
            id: newId,
            name,
            points: 0,
            assist: 0,
            rebound: 0
        };
        setPlayers([...players, newPlayer]);
    };

    const removePlayer = (id: number) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    const updatePlayerStats = (
        id: number,
        stats: {
            points?: number;
            assist?: number;
            rebound?: number;
        }
    ) => {
        setPlayers(players.map(player =>
                player.id === id
                    ? {
                        ...player,
                        points: stats.points !== undefined ? Math.max(0, stats.points) : player.points,
                        assist: stats.assist !== undefined ? Math.max(0, stats.assist) : player.assist,
                        rebound: stats.rebound !== undefined ? Math.max(0, stats.rebound) : player.rebound,
                    }
                    : player
            )
        );
    };

    return (
        <PlayersContext.Provider
            value={{
                players,
                addPlayer,
                removePlayer,
                updatePlayerStats,
                loading,
            }}
        >
            {children}
        </PlayersContext.Provider>
    );
};

export const usePlayers = () => {
    const context = useContext(PlayersContext);
    if (!context) {
        throw new Error('usePlayers must be used within a PlayersProvider');
    }
    return context;
};