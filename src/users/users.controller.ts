import { Body, Controller, HttpException, Post, Response, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { schema } from 'src/validation/joiSchema';
import { JoiValidationPipe } from 'src/validation/joiValidationPipe';
import { LoginDto } from './dtos/loginDto';
import { SignUpDto } from './dtos/signUpDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }



    @Post('/sign-up')
    @ApiOperation({
        summary: 'user registration api',
        description: 'this route enables users to register to our app'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 201,
        description: 'You have successfully registered'
    })
    @UsePipes(new JoiValidationPipe(schema.signUp))
    async signUpController(@Body() userData: SignUpDto) {
        try {
            return await this.usersService.signUpService(userData.username, userData.password);

        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = err.code == 23505 ? 'User with that username already exists' : 'Something went wrong';
            throw new HttpException(ERR_MESSAGE, 400);
        }
    }


    @Post('/login')
    @ApiOperation({
        summary: 'login into app',
        description: 'this route enables both users and admins to login into our app'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 200,
        description: 'You have successfully logged in'
    })
    @UsePipes(new JoiValidationPipe(schema.login))
    async loginController(@Body() userData: LoginDto, @Response() response) {
        try {
            const jwtToken = await this.usersService.loginService(userData.username, userData.password);
            response.cookie('jwt', jwtToken, {
                sameSite: 'strict',
                httpOnly: true
            })
            response.status(200);
            return response.send({ message: 'Logged in - redirect to image gallery main screen' })
        } catch (err) {
            console.log(err);
            if (err.status == 401) {
                throw new HttpException(err.response, err.status);
            }
            const ERR_MESSAGE = 'Something went wrong';
            throw new HttpException(ERR_MESSAGE, 400);
        }
    }
}
