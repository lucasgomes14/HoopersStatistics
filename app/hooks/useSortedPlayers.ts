import {useMemo} from 'react';
import {Player} from "../types/Player";
import {OrderBy} from "../types/OrderBy";

const useSortedPlayers = (players: Player[], orderBy: OrderBy) => {

    return useMemo(() => {
        const sortFunctions = {
            name: (a: Player, b: Player) => a.name.localeCompare(b.name),
            points: (a: Player, b: Player) => b.points - a.points,
            assist: (a: Player, b: Player) => b.assist - a.assist,
            rebound: (a: Player, b: Player) => b.rebound - a.rebound,
        };

        return [...players].sort(sortFunctions[orderBy]);
    }, [players, orderBy]);
};

export default useSortedPlayers;