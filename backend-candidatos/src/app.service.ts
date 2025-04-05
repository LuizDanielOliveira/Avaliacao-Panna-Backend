import { Injectable } from '@nestjs/common';
import { CreateCandidatoDto } from './candidatos/dto/create-candidato.dto';

const candidatos: CreateCandidatoDto[] = [];

@Injectable()
export class AppService {
  create(candidato: CreateCandidatoDto) {
    candidatos.push(candidato);
    return { message: 'Candidato criado', candidato };
  }

  updateByCpf(cpf: string, candidato: CreateCandidatoDto) {
    const index = candidatos.findIndex(c => c.cpf === cpf);
    if (index === -1) return { message: 'CPF não encontrado' };
    candidatos[index] = candidato;
    return { message: 'Atualizado com sucesso', candidato };
  }

  findAll() {
    return candidatos;
  }
}
