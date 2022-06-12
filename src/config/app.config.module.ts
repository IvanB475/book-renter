import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app.config.service';
import configuration from './app.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [AppConfigService, ConfigService],
  exports: [AppConfigService, ConfigService]
})
export class AppConfigModule {}
