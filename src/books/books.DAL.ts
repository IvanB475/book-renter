import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/users/entities/UserEntity";
import { EntityManager } from "typeorm";
import { AddBookInfoDto } from "./dtos/addBookInfoDto";
import { editBookInfoDto } from "./dtos/editBookInfoDto";
import { BookEntity } from "./entities/BookEntity";
import { RentedBooksEntity } from "./entities/RentedBooksEntity";



@Injectable()
export class BooksDAL {
    constructor(
        private entityManager: EntityManager
    ) { }

    async addBook(bookInfo: AddBookInfoDto) {
        const newBook = new BookEntity();
        newBook.name = bookInfo.name;
        newBook.author = bookInfo.author || null;
        newBook.description = bookInfo.description || null;
        newBook.totalAmountAvailable = bookInfo.totalAmountAvailable;
        newBook.currentlyRented = bookInfo.currentlyRented;
        newBook.image = bookInfo.image || null;
        await newBook.save();
    }

    async getBook(bookId: number): Promise<BookEntity> {
        const book = await this.entityManager.findOneBy(BookEntity, { id: bookId });
        return book;
    }

    async getAllBooks(resultsToReturn: number, resultsToSkip: number): Promise<BookEntity[]> {
        const allBooks = await this.entityManager.find(BookEntity, { take: resultsToReturn, skip: resultsToSkip });
        return allBooks;
    }


    async editBook(bookInfo: editBookInfoDto, bookId: number) {
        const bookToEdit = await this.entityManager.findOneBy(BookEntity, { id: bookId });
        bookToEdit.description = bookInfo.description || bookToEdit.description;
        bookToEdit.totalAmountAvailable = bookInfo.totalAmountAvailable || bookToEdit.totalAmountAvailable;
        bookToEdit.currentlyRented = bookInfo.currentlyRented || bookToEdit.currentlyRented;
        bookToEdit.image = bookInfo.image || bookToEdit.image;
        await bookToEdit.save();
    }

    async deleteBook(bookId: number) {
        await this.entityManager.delete(BookEntity, { id: bookId });
    } 

    async rentBook(quantity: number, bookId: number, userId: number, bookToRent: BookEntity, userThatRents: UserEntity) {
        const UserAlreadyRentedBook = await this.entityManager.findOne(RentedBooksEntity, { where: { user: { id: userId }, book: { id: bookId } } })
        if (UserAlreadyRentedBook) {
            UserAlreadyRentedBook.quantity += quantity || 1;
            await UserAlreadyRentedBook.save();
        } else {
            const rentedBook = new RentedBooksEntity();
            rentedBook.book = bookToRent;
            rentedBook.user = userThatRents;
            rentedBook.quantity = quantity || 1;
            await rentedBook.save()
        }

        bookToRent.currentlyRented += quantity || 1;
        await bookToRent.save();
    }
}   