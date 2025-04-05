// src/candidatos/candidatos.service.ts
import { Injectable } from '@nestjs/common';
import { poolPromise } from '../database.provider';
import { CreateCandidatoDto } from './dto/create-candidato.dto';

@Injectable()
export class CandidatosService {

  async createOrUpdate(createCandidatoDto: CreateCandidatoDto) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nome', createCandidatoDto.nome)
      .input('cpf', createCandidatoDto.cpf)
      .input('email', createCandidatoDto.email)
      .input('telefone', createCandidatoDto.telefone)
      .input('endereco', createCandidatoDto.endereco)
      .input('qualificacoes', createCandidatoDto.qualificacoes)
      .input('curriculo', createCandidatoDto.curriculo || null)
      .query(`
        IF EXISTS (SELECT * FROM candidatos WHERE cpf = @cpf)
          UPDATE candidatos SET
            nome = @nome, email = @email, telefone = @telefone,
            endereco = @endereco, qualificacoes = @qualificacoes,
            curriculo = ISNULL(@curriculo, curriculo)
          WHERE cpf = @cpf
        ELSE
          INSERT INTO candidatos
            (nome, cpf, email, telefone, endereco, qualificacoes, curriculo)
          VALUES
            (@nome, @cpf, @email, @telefone, @endereco, @qualificacoes, @curriculo)
      `);

    return result;
  }

  async findAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM candidatos');
    return result.recordset;
  }
}
