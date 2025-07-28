import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Match} from "../entity/match.entity";
import {MatchService} from "../service/match.service";
import {MatchController} from "../controller/match.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Match])],
    controllers: [MatchController],
    providers: [MatchService],
})

export class MatchModule {}
