import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {MatchService} from "../service/match.service";
import {CreateMatchDto} from "../dto/create-match.dto";

@Controller('matches')
export class MatchController {
    constructor(private readonly service: MatchService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post()
    create(@Body() dto: CreateMatchDto) {
        return this.service.create(dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
