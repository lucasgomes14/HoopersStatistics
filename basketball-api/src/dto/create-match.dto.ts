export class CreateMatchDto {
    teams: {
        players: {
            id: number;
            name: string;
            points: number;
            assist: number;
            rebound: number;
        }[];
        totalPoints: number;
    }[];
    duration: number;
}
