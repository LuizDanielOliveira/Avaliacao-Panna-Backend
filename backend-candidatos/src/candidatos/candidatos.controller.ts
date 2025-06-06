import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common'
import { CandidatosService } from './candidatos.service'
import { CreateCandidatoDto } from './dto/create-candidato.dto'

@Controller('candidatos')
export class CandidatosController {
  constructor(private readonly candidatosService: CandidatosService) {}

  @Post()
  createOrUpdate(@Body() createCandidatoDto: CreateCandidatoDto) {
    return this.candidatosService.createOrUpdate(createCandidatoDto)
  }

  @Get()
  findAll() {
    return this.candidatosService.findAll()
  }

  @Put(':cpf')
  updateByCpf(@Param('cpf') cpf: string, @Body() data: CreateCandidatoDto) {
    return this.candidatosService.updateByCpf(cpf, data)
  }
}
