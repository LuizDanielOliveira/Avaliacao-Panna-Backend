import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { poolPromise } from './database.provider';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  });

  const config = new DocumentBuilder()
  .setTitle('API Candidatos')
  .setDescription('API para cadastro de candidatos')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  await poolPromise;
  await app.listen(3001);
}
bootstrap();
