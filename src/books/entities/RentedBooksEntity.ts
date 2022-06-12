import { UserEntity } from "src/users/entities/UserEntity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "./BookEntity";

@Entity({
    name: 'rentedBooks'
})
export class RentedBooksEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => BookEntity)
    @JoinColumn()
    book: BookEntity;

    @Column({ default: 1 })
    quantity: number;
}