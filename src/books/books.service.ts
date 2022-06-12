import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/UserEntity';
import { EntityManager } from 'typeorm';
import { AddBookInfoDto } from './dtos/addBookInfoDto';
import { editBookInfoDto } from './dtos/editBookInfoDto';
import { BookEntity } from './entities/BookEntity';
import { RentedBooksEntity } from './entities/RentedBooksEntity';

@Injectable()
export class BooksService {
    constructor(private entityManager: EntityManager) { }

    async addBookService(bookInfo: AddBookInfoDto) {

        const newBook = new BookEntity();
        newBook.name = bookInfo.name;
        newBook.author = bookInfo.author || null;
        newBook.description = bookInfo.description || null;
        newBook.totalAmountAvailable = bookInfo.totalAmountAvailable;
        newBook.currentlyRented = bookInfo.currentlyRented;
        newBook.image = bookInfo.image || null;
        await newBook.save();

        const SUCCESS_RESPONSE_MESSAGE = 'Book added successfully!';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }

    // returns message book doesnt exist but status is 200
    async getBookService(bookId: number) {
        const foundBook = await this.entityManager.findOneBy(BookEntity, { id: bookId });
        if (!foundBook) {
            const FAILURE_RESPONSE_MESSAGE = 'Book with that id does not exist';
            const responseToUser = {
                message: FAILURE_RESPONSE_MESSAGE
            }
            return responseToUser;
        }
        return foundBook;
    }

    async getAllBooksService(limit: number, page: number) {
        const resultCountDesired = limit || 20;
        const pagesToSkip = page - 1 || 0;
        const resultsToSkip = resultCountDesired * pagesToSkip;
        const foundBooks = await this.entityManager.find(BookEntity, { take: resultCountDesired, skip: resultsToSkip });
        return foundBooks;
    }

    async editBookService(bookInfo: editBookInfoDto, bookId: number) {
        const bookToEdit = await this.entityManager.findOneBy(BookEntity, { id: bookId });
        bookToEdit.description = bookInfo.description || bookToEdit.description;
        bookToEdit.totalAmountAvailable = bookInfo.totalAmountAvailable || bookToEdit.totalAmountAvailable;
        bookToEdit.currentlyRented = bookInfo.currentlyRented || bookToEdit.currentlyRented;
        bookToEdit.image = bookInfo.image || bookToEdit.image;
        await bookToEdit.save();

        const SUCCESS_RESPONSE_MESSAGE = 'successfully saved changes';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }


    async deleteBookService(bookId: number) {
        await this.entityManager.delete(BookEntity, { id: bookId })

        const SUCCESS_RESPONSE_MESSAGE = 'book has been deleted successfully';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }

    async rentBookService(quantity: number, bookId: number, userId: number) {
        const bookToRent = await this.entityManager.findOneBy(BookEntity, { id: bookId });
        if (!bookToRent) {
            const FAILURE_RESPONSE_MESSAGE = 'Book with that id does not exist'
            const responseToUser = {
                message: FAILURE_RESPONSE_MESSAGE
            }
            return responseToUser;
        }


        const userThatRents = await this.entityManager.findOneBy(UserEntity, { id: userId });

        if (!userThatRents) {
            const FAILURE_RESPONSE_MESSAGE = 'user with that id does not exist'
            const responseToUser = {
                message: FAILURE_RESPONSE_MESSAGE
            }
            return responseToUser;
        }

        const currentlyAvailableCopies = bookToRent.totalAmountAvailable - bookToRent.currentlyRented;

        if (quantity > currentlyAvailableCopies) {
            const FAILURE_RESPONSE_MESSAGE = 'you have requested way too many copies!'
            const responseToUser = {
                message: FAILURE_RESPONSE_MESSAGE
            }
            return responseToUser;
        }

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
        const SUCCESS_RESPONSE_MESSAGE = 'You have successfully rented the book(s)!';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }
}
