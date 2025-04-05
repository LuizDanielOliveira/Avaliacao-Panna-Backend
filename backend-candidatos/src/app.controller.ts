import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCandidatoDto } from './candidatos/dto/create-candidato.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('candidatos')
  create(@Body() candidato: CreateCandidatoDto) {
    return this.appService.create(candidato);
  }

  @Put('candidatos/:cpf')
  updateByCpf(@Body() candidato: CreateCandidatoDto) {
    return this.appService.updateByCpf(candidato.cpf, candidato);
  }

  @Get('candidatos')
  findAll() {
    return this.appService.findAll();
  }
}
