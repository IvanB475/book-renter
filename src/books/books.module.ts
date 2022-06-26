import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { UtilsService } from 'src/utils/utils.service';
import { AppConfigService } from 'src/config/app.config.service';
import { ConfigService } from '@nestjs/config';
import { isUserMiddleware } from 'src/middlewares/isUser.middleware';
import { isAdminMiddleware } from 'src/middlewares/isAdmin.middleware';
import { BooksDAL } from './books.DAL';
import { UsersDAL } from 'src/users/users.DAL';

@Module({
  providers: [BooksService, UtilsService, AppConfigService, ConfigService, BooksDAL, UsersDAL],
  controllers: [BooksController]
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isUserMiddleware)
      .exclude(
        { path: 'books/gallery', method: RequestMethod.GET },
        { path: 'books/:id', method: RequestMethod.GET }
      ).forRoutes(BooksController);

    consumer.apply(isAdminMiddleware).forRoutes(
      { path: 'books/add', method: RequestMethod.POST },
      { path: 'books/:id', method: RequestMethod.PUT },
      { path: 'books/:id', method: RequestMethod.DELETE }
    )
  }
}
