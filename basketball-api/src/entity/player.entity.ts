import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Player {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 0 })
    points: number;

    @Column({ default: 0 })
    assist: number;

    @Column({ default: 0 })
    rebound: number;

    @Column({ default: 0 })
    games: number;
}
