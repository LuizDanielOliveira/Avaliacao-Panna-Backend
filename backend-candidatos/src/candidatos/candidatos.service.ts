import { Injectable } from '@nestjs/common'
import { poolPromise } from '../database.provider'
import { CreateCandidatoDto } from './dto/create-candidato.dto'

@Injectable()
export class CandidatosService {
  async createOrUpdate(createCandidatoDto: CreateCandidatoDto) {
    const pool = await poolPromise

    const { nome, cpf, email, telefone, endereco, qualificacoes, curriculo } = createCandidatoDto

    // Checa se já existe pelo CPF
    const check = await pool.request()
      .input('cpf', cpf)
      .query('SELECT * FROM candidatos WHERE cpf = @cpf')

    if (check.recordset.length > 0) {
      // Atualiza se já existe
      await pool.request()
        .input('nome', nome)
        .input('cpf', cpf)
        .input('email', email)
        .input('telefone', telefone)
        .input('endereco', endereco)
        .input('qualificacoes', qualificacoes)
        .input('curriculo', curriculo || null)
        .query(`
          UPDATE candidatos SET
            nome = @nome,
            email = @email,
            telefone = @telefone,
            endereco = @endereco,
            qualificacoes = @qualificacoes,
            curriculo = ISNULL(@curriculo, curriculo)
          WHERE cpf = @cpf
        `)

      return { message: 'Candidato atualizado com sucesso!' }
    } else {
      // Insere se não existe
      await pool.request()
        .input('nome', nome)
        .input('cpf', cpf)
        .input('email', email)
        .input('telefone', telefone)
        .input('endereco', endereco)
        .input('qualificacoes', qualificacoes)
        .input('curriculo', curriculo || null)
        .query(`
          INSERT INTO candidatos (nome, cpf, email, telefone, endereco, qualificacoes, curriculo)
          VALUES (@nome, @cpf, @email, @telefone, @endereco, @qualificacoes, @curriculo)
        `)

      return { message: 'Candidato cadastrado com sucesso!' }
    }
  }

  async findAll() {
    const pool = await poolPromise
    const result = await pool.request().query('SELECT * FROM candidatos')
    return result.recordset
  }
}
