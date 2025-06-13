import React, {createContext, useContext} from 'react';
import usePersistedState from '../hooks/usePersistedState';
import {Player} from "../types/Player";

interface PlayersContextType {
    players: Player[];
    addPlayer: (name: string) => void;
    removePlayer: (id: number) => void;
    updatePlayerStats: (
        stats: {
            id: number;
            points: number;
            assist: number;
            rebound: number;
            games: number;
        }[]
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
            rebound: 0,
            games: 0
        };
        setPlayers([...players, newPlayer]);
    };

    const removePlayer = (id: number) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    const updatePlayerStats = (updatedStats: {
        id: number;
        points: number;
        assist: number;
        rebound: number;
        games: number;
    }[]) => {
        setPlayers(players.map(player => {
                const stat = updatedStats.find(p => p.id === player.id);
                if (!stat) return player;

                return {
                    ...player,
                    points: player.points + stat.points,
                    assist: player.assist + stat.assist,
                    rebound: player.rebound + stat.rebound,
                    games: player.games + stat.games,
                };
            })
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