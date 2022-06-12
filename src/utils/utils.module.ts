import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/app.config.service';
import { UtilsService } from './utils.service';

@Module({
  providers: [UtilsService, AppConfigService, ConfigService]
})
export class UtilsModule {
}
