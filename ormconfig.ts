import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "src/books/entities/BookEntity";
import { RentedBooksEntity } from "src/books/entities/RentedBooksEntity";
import { AppConfigModule } from "src/config/app.config.module";
import { AppConfigService } from "src/config/app.config.service";
import { RoleEntity } from "src/users/entities/RoleEntity";
import { UserEntity } from "src/users/entities/UserEntity";

export const databaseConfig = TypeOrmModule.forRootAsync({
    imports: [AppConfigModule],
    useFactory: (appConfigService: AppConfigService) => ({
        type: 'postgres',
        host: appConfigService.db_host,
        port: appConfigService.db_port,
        username: appConfigService.db_username,
        password: appConfigService.db_password,
        database: appConfigService.db_database,
        entities: [RentedBooksEntity, UserEntity, RoleEntity, BookEntity],
        synchronize: true
    }),
    inject: [AppConfigService]
})