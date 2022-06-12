import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UtilsService } from 'src/utils/utils.service';
import { AppConfigService } from 'src/config/app.config.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService, UtilsService, AppConfigService, ConfigService],
  controllers: [UsersController]
})
export class UsersModule { }
