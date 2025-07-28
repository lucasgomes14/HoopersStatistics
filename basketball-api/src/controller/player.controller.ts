import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {PlayerService} from "../service/player.service";
import {CreatePlayerDto} from "../dto/create-player.dto";

@Controller('players')
export class PlayersController {
    constructor(private readonly service: PlayerService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post()
    create(@Body() dto: CreatePlayerDto) {
        return this.service.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() stats: any) {
        return this.service.updateStats(+id, stats);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
