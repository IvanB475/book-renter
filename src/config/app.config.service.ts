import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariablesInterface } from './interfaces/environmentVariablesInterface';

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService<EnvironmentVariablesInterface>) {
    }

    get port(): number {
        return this.configService.get<number>('port');
    }

    get db_host(): string {
        return this.configService.get<string>('db_host');
    }

    get db_port(): number {
        return this.configService.get<number>('db_port');
    }

    get db_database(): string {
        return this.configService.get<string>('db_database')
    }

    get db_username(): string {
        return this.configService.get<string>('db_username')
    }
    get db_password(): string {
        return this.configService.get<string>('db_password')
    }
    get token_secret(): string {
        return this.configService.get<string>('token_secret')
    }
}
