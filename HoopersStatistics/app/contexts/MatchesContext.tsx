import React, { createContext, useContext } from 'react';
import usePersistedState from '../hooks/usePersistedState';
import { Match } from '../types/Match';
import {SyncService} from "@/src/service/SyncService";

interface MatchesContextType {
    matches: Match[];
    addMatch: (match: Match) => void;
    removeMatch: (id: number) => void;
    loading: boolean;
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

export const MatchesProvider = ({ children }: { children: React.ReactNode }) => {
    const [matches, setMatches, loading] = usePersistedState<Match[]>('matches', []);

    const addMatch = async (match: Match) => {
        const updatedMatches = [...matches, match];
        setMatches(updatedMatches);

        await SyncService.addToQueue({
            type: 'CREATE',
            entityType: 'matches',
            data: match
        });
    };

    const removeMatch = async (id: number) => {
        setMatches(matches.filter(m => m.id !== id));

        await SyncService.addToQueue({
            type: 'DELETE',
            entityType: 'matches',
            id
        });
    };

    return (
        <MatchesContext.Provider value={{ matches, addMatch, removeMatch, loading }}>
            {children}
        </MatchesContext.Provider>
    );
};

export const useMatches = () => {
    const context = useContext(MatchesContext);
    if (!context) {
        throw new Error('useMatches must be used within a MatchesProvider');
    }
    return context;
};
