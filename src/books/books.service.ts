import { Injectable } from '@nestjs/common';
import { UsersDAL } from 'src/users/users.DAL';
import { BooksDAL } from './books.DAL';
import { AddBookInfoDto } from './dtos/addBookInfoDto';
import { editBookInfoDto } from './dtos/editBookInfoDto';

@Injectable()
export class BooksService {
    constructor(
        private booksDAL: BooksDAL,
        private usersDAL: UsersDAL
    ) { }

    async addBookService(bookInfo: AddBookInfoDto) {
        await this.booksDAL.addBook(bookInfo);

        const SUCCESS_RESPONSE_MESSAGE = 'Book added successfully!';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }

    async getBookService(bookId: number) {
        const foundBook = await this.booksDAL.getBook(bookId);
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
        const resultsToReturn = limit || 20;
        const pagesToSkip = page - 1 || 0;
        const resultsToSkip = resultsToReturn * pagesToSkip;
        const foundBooks = await this.booksDAL.getAllBooks(resultsToReturn, resultsToSkip);
        return foundBooks;
    }

    async editBookService(bookInfo: editBookInfoDto, bookId: number) {
        await this.booksDAL.editBook(bookInfo, bookId);

        const SUCCESS_RESPONSE_MESSAGE = 'successfully saved changes';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }


    async deleteBookService(bookId: number) {
        await this.booksDAL.deleteBook(bookId);

        const SUCCESS_RESPONSE_MESSAGE = 'book has been deleted successfully';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }

    async rentBookService(quantity: number, bookId: number, userId: number) {
        const bookToRent = await this.booksDAL.getBook(bookId);
        if (!bookToRent) {
            const FAILURE_RESPONSE_MESSAGE = 'Book with that id does not exist'
            const responseToUser = {
                message: FAILURE_RESPONSE_MESSAGE
            }
            return responseToUser;
        }

        const userThatRents = await this.usersDAL.findUserById(userId);
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

        await this.booksDAL.rentBook(quantity, bookId, userId, bookToRent, userThatRents);

        const SUCCESS_RESPONSE_MESSAGE = 'You have successfully rented the book(s)!';
        const responseToUser = {
            message: SUCCESS_RESPONSE_MESSAGE
        }
        return responseToUser;
    }
}
