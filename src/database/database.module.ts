import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule { }
