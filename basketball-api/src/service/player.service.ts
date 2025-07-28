import {InjectRepository} from "@nestjs/typeorm";
import {Player} from "../entity/player.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {CreatePlayerDto} from "../dto/create-player.dto";

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepo: Repository<Player>,
    ) {}

    findAll() {
        return this.playerRepo.find();
    }

    create(dto: CreatePlayerDto) {
        const player = this.playerRepo.create(dto);
        return this.playerRepo.save(dto);
    }

    updateStats(id: number, stats: Partial<Player>) {
        return this.playerRepo.update(id, stats);
    }

    remove(id: number) {
        return this.playerRepo.delete(id);
    }
}
