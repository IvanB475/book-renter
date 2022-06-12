import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class isUserMiddleware implements NestMiddleware {
    constructor(
        private utilsService: UtilsService
    ) { }

    async use(req: Request, _: Response, next: NextFunction) {
        const authHeader = req.headers?.authorization;
        if (!authHeader || authHeader?.split(' ').length !== 2 || authHeader?.split(' ')[0] !== 'Bearer') {
            const ERR_MESSAGE = 'INVALID TOKEN FORMAT';
            const ERR_STATUS = 401;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS)
        }
        const token = authHeader.split(' ')[1];
        const userId = this.utilsService.getUserIdFromToken(token);
        if (!userId) {
            const ERR_MESSAGE = 'you are not allowed to use this route';
            const ERR_STATUS = 401;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS)
        }

        next()
    }
}