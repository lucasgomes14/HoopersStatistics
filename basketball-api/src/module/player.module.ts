import {Module} from "@nestjs/common";
import {PlayersController} from "../controller/player.controller";
import {PlayerService} from "../service/player.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Player} from "../entity/player.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Player])],
    controllers: [PlayersController],
    providers: [PlayerService],
})

export class PlayerModule {}
