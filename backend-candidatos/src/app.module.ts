import { Module } from '@nestjs/common';
import { CandidatosModule } from './candidatos/candidatos.module';

@Module({
  imports: [CandidatosModule],
})
export class AppModule {}