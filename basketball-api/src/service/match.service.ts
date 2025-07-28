import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Match} from "../entity/match.entity";
import {Repository} from "typeorm";
import {CreateMatchDto} from "../dto/create-match.dto";

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepo: Repository<Match>,
    ) {}

    findAll() {
        return this.matchRepo.find();
    }

    create(dto: CreateMatchDto) {
        const match = this.matchRepo.create(dto);
        return this.matchRepo.save(match);
    }

    remove(id: number) {
        return this.matchRepo.delete(id);
    }
}
