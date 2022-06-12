import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AppConfigModule } from './config/app.config.module';
import { UtilsModule } from './utils/utils.module';
import { databaseConfig } from 'ormconfig';

@Module({
  imports: [UsersModule, BooksModule, AppConfigModule,
    databaseConfig,
    UtilsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
