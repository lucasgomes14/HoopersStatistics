import {MatchPlayerStats} from "@/app/types/MatchPlayerStats";

export interface Match {
    id: number;
    teams: {
        players: MatchPlayerStats[];
        totalPoints: number;
    }[];
    duration: number;
}
