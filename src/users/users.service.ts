import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { UsersDAL } from './users.DAL';

@Injectable()
export class UsersService {
    constructor(private utilsService: UtilsService,
        private usersDAL: UsersDAL) { }

    async signUpService(username: string, password: string) {
        const hashedPassword = await this.utilsService.hashPassword(password);
        const user = await this.usersDAL.signUp(username, hashedPassword)
        const token = this.utilsService.generateToken(user.id, user.role.name);
        const SUCCESS_RESPONSE_MESSAGE = 'welcome to book renter app!';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE,
            token
        }
        return responseToUser;
    }

    async loginService(username: string, password: string) {
        const user = await this.usersDAL.login(username);
        const isUser = await this.utilsService.validateLogin(password, user.password)
        if (!isUser) {
            const FAILURE_RESPONSE_MESSAGE = 'wrong username or password';
            throw new UnauthorizedException(FAILURE_RESPONSE_MESSAGE);
        }

        const token = this.utilsService.generateToken(user.id, user.role.name);

        const SUCCESS_RESPONSE_MESSAGE = 'Logged in - redirect to image gallery main screen';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE,
            token
        }

        return responseToUser;
    }
}
