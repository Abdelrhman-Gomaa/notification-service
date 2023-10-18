import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    NotificationModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: process.env.CLIENT,
          connection: {
            host: process.env.HOST,
            port: +process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          },
          useNullAsDefault: true,
          migrations: {
            directory: './src/database/migrations',
          },
        }
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
