import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { RentedBooksEntity } from "./RentedBooksEntity";


@Entity({
    name: 'books'
})
export class BookEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    author: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    totalAmountAvailable: number;

    @Column({ default: 0 })
    currentlyRented: number;

    @Column({ nullable: true })
    image: string;

    @OneToMany(() => RentedBooksEntity, rentedBook => rentedBook.user, { nullable: true })
    users: RentedBooksEntity[];
}