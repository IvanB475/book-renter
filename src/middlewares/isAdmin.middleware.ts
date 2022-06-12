import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UtilsService } from "src/utils/utils.service";


@Injectable()
export class isAdminMiddleware implements NestMiddleware {
    constructor(
        private utilsService: UtilsService
    ) { }

    async use(req: Request, _: Response, next: NextFunction) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            const ERR_MESSAGE = 'INVALID TOKEN';
            const ERR_STATUS = 401;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS)
        }
        const userRole = this.utilsService.getUserRoleFromToken(token);
        if (userRole === 'admin') {
            next();
        } else {
            const ERR_MESSAGE = 'you are not allowed to use this route';
            const ERR_STATUS = 403;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS)
        }
    }
}