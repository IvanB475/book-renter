import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { EntityManager } from 'typeorm';
import { RoleEntity } from './entities/RoleEntity';
import { UserEntity } from './entities/UserEntity';

@Injectable()
export class UsersService {
    constructor(private utilsService: UtilsService,
        private entityManager: EntityManager) { }

    async signUpService(username: string, password: string) {
        const hashedPassword = await this.utilsService.hashPassword(password);
        const newUser = new UserEntity(username, hashedPassword);
        const userRole = await this.entityManager.findOneBy(RoleEntity, { name: 'user' })
        newUser.role = userRole;
        const user = await newUser.save();
        const token = this.utilsService.generateToken(user.id, user.role.name);

        return token;
    }

    async loginService(username: string, password: string) {
        const user = await this.entityManager.createQueryBuilder(UserEntity, 'user').leftJoinAndSelect('user.role', 'role.name').where('user.username = :username', { username }).getOne();
        const isUser = await this.utilsService.validateLogin(password, user.password)
        if (!isUser) {
            const FAILURE_RESPONSE_MESSAGE = 'wrong username or password';
            return FAILURE_RESPONSE_MESSAGE;
        }

        const token = this.utilsService.generateToken(user.id, user.role.name);

        return token;
    }
}
