import { RentedBooksEntity } from "src/books/entities/RentedBooksEntity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./RoleEntity";


@Entity({
    name: 'users'
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @ManyToOne(() => RoleEntity, role => role.users)
    role: RoleEntity;

    @OneToMany(() => RentedBooksEntity, rentedBook => rentedBook.book, { nullable: true })
    booksRented: RentedBooksEntity[];

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }
}