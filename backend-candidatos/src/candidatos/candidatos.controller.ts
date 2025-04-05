// src/candidatos/candidatos.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CandidatosService } from './candidatos.service';
import { CreateCandidatoDto } from './dto/create-candidato.dto';

@Controller('candidatos')
export class CandidatosController {
  constructor(private readonly candidatosService: CandidatosService) {}

  @Post()
  createOrUpdate(@Body() createCandidatoDto: CreateCandidatoDto) {
    return this.candidatosService.createOrUpdate(createCandidatoDto);
  }

  @Get()
  findAll() {
    return this.candidatosService.findAll();
  }
}
