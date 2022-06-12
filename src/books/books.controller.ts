import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { UtilsService } from 'src/utils/utils.service';
import { schema } from 'src/validation/joiSchema';
import { JoiValidationPipe } from 'src/validation/joiValidationPipe';
import { BooksService } from './books.service';
import { AddBookInfoDto } from './dtos/addBookInfoDto';
import { editBookInfoDto } from './dtos/editBookInfoDto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService,
        private utilsService: UtilsService) {

    }

    @Post('/add')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'admin route for adding new books',
        description: 'this route enables admins to add new books to book renter app'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 201,
        description: 'New book was added'
    })
    @ApiParam({ name: 'AddBookInfoDto' })
    @UsePipes(new JoiValidationPipe(schema.addBook))
    async addBookController(@Body() bookInfo: AddBookInfoDto) {
        try {
            return await this.booksService.addBookService(bookInfo);
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = err.message || 'error occured while trying to add new book';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Get('/gallery')
    @ApiOperation({
        summary: 'listing all books',
        description: 'this route enables all users to see list of available books'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 200,
        description: 'List of books will be returned'
    })
    async getAllBooksController(@Query('limit') limit: number, @Query('page') page: number) {
        try {
            return await this.booksService.getAllBooksService(limit, page);
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = err.message || 'error occured while trying to fetch list of all books';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Get('/:id')
    @ApiOperation({
        summary: 'get a book',
        description: 'this route enables user to get details about a specific book'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 200,
        description: 'Book details will be returned'
    })
    async getBookController(@Param('id') bookId: number) {
        try {
            return await this.booksService.getBookService(bookId);
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = err.message || 'error occured while trying to fetch a book';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Put('/:id')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'admin route for editing books',
        description: 'this route enables admins to edit books'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 200,
        description: 'Book was successfully edited'
    })
    @ApiParam({ name: "editBookInfoDto" })
    @UsePipes(new JoiValidationPipe(schema.editBook))
    async editBookController(@Body() bookInfo: editBookInfoDto, @Param('id') bookId: number) {
        try {
            return await this.booksService.editBookService(bookInfo, bookId);
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = err.message || 'error occured while trying to edit a book';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Delete('/:id')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'admin route for deleting books',
        description: 'this route enables admins to delete books'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 200,
        description: 'Book was successfully deleted'
    })
    async deleteBookController(@Param('id') bookId: number) {
        try {
            return await this.booksService.deleteBookService(bookId);
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = err.message || 'error occured while trying to delete a book';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Post('/:id/rent')
    @ApiOperation({
        summary: 'rent a book',
        description: 'this route enables users to rent a book'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 201,
        description: 'Book was successfully rented'
    })
    @ApiBearerAuth()
    async rentBookController(@Body('quantity') quantity: number, @Headers() headers, @Param('id') bookId: number) {
        try {
            const authToken = headers.authorization.split(' ')[1];
            const userId = this.utilsService.getUserIdFromToken(authToken);
            return this.booksService.rentBookService(quantity, bookId, userId);
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = err.message || 'error occured while trying to rent a book';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }


}
