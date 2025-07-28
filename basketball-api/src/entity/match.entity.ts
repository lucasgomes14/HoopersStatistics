import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'jsonb'})
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

    @Column()
    duration: number;
}
