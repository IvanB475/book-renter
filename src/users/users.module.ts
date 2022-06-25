import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UtilsService } from 'src/utils/utils.service';
import { AppConfigService } from 'src/config/app.config.service';
import { ConfigService } from '@nestjs/config';
import { UsersDAL } from './users.DAL';

@Module({
  providers: [UsersService, UtilsService, AppConfigService, ConfigService, UsersDAL],
  controllers: [UsersController]
})
export class UsersModule { }
