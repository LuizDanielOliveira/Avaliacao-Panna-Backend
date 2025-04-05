import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCandidatoDto } from './candidatos/dto/create-candidato.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            create: jest.fn().mockReturnValue({ message: 'Candidato criado' }),
            updateByCpf: jest.fn().mockReturnValue({ message: 'Atualizado' }),
            findAll: jest.fn().mockReturnValue([{ nome: 'João' }]),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should create candidato', () => {
    const dto: CreateCandidatoDto = {
      nome: 'João',
      cpf: '123',
      email: 'joao@mail.com',
      telefone: '99999',
      endereco: 'Rua A',
      qualificacoes: 'JS',
      curriculo: 'base64',
    };
    expect(appController.create(dto)).toEqual({ message: 'Candidato criado' });
  });

  it('should update candidato by cpf', () => {
    const dto: CreateCandidatoDto = {
      nome: 'João Atualizado',
      cpf: '123',
      email: 'joao@mail.com',
      telefone: '99999',
      endereco: 'Rua A',
      qualificacoes: 'JS',
      curriculo: 'base64',
    };
    expect(appController.updateByCpf(dto)).toEqual({ message: 'Atualizado' });
  });

  it('should return all candidatos', () => {
    expect(appController.findAll()).toEqual([{ nome: 'João' }]);
  });
});
