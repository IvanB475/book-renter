import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { RoleEntity } from "./entities/RoleEntity";
import { UserEntity } from "./entities/UserEntity";



@Injectable()
export class UsersDAL {
    constructor(
        private entityManager: EntityManager,
    ) { }


    async signUp(username: string, password: string): Promise<UserEntity> {
        const newUser = new UserEntity(username, password);
        const userRole = await this.entityManager.findOneBy(RoleEntity, { name: 'user' })
        newUser.role = userRole;
        const user = await newUser.save();

        return user;
    }

    async login(username: string): Promise<UserEntity> {
        const user = await this.entityManager.createQueryBuilder(UserEntity, 'user').leftJoinAndSelect('user.role', 'role.name').where('user.username = :username', { username }).getOne();
        return user;
    }
}