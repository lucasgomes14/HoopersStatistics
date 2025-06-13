import React, { createContext, useContext } from 'react';
import usePersistedState from '../hooks/usePersistedState';
import { Match } from '../types/Match';

interface MatchesContextType {
    matches: Match[];
    addMatch: (match: Match) => void;
    removeMatch: (id: number) => void;
    loading: boolean;
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

export const MatchesProvider = ({ children }: { children: React.ReactNode }) => {
    const [matches, setMatches, loading] = usePersistedState<Match[]>('matches', []);

    const addMatch = (match: Match) => {
        setMatches([...matches, match]);
    };

    const removeMatch = (id: number) => {
        setMatches(matches.filter(m => m.id !== id));
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
