import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'adeo_user',
      password: 'adeo_password',
      database: 'ppm_db',
      autoLoadEntities: true,
      synchronize: true, // Idéal pour un POC, crée les tables automatiquement
    }),
  ],
})
export class AppModule {}
