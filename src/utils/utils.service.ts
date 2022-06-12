import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from 'src/config/app.config.service';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UtilsService {
    constructor(private appConfigService: AppConfigService) { }

    async hashPassword(password: string) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds)
        return hash;

    }


    generateToken(id: number, role: string) {
        const TOKEN_SECRET = this.appConfigService.token_secret;

        const token = jwt.sign({ userId: id, userRole: role }, TOKEN_SECRET, {
            expiresIn: '1h'
        })

        return token;

    }

    getUserIdFromToken(token: string) {
        const decoded = jwt.decode(token);
        const userId = decoded['userId'];
        return userId;
    }

    getUserRoleFromToken(token: string) {
        const decoded = jwt.decode(token);
        const userRole = decoded['userRole'];
        return userRole;
    }


    async validateLogin(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }


}
