import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.dto';
import { SuccessResponse } from 'src/common/dto/success.dto';
import { ErrorResponse } from 'src/common/dto/error.dto';

@Controller()
export class UserController {
    constructor(private userService: UserService) {

    }

    @Get('/users')
    async getUserList(): Promise<SuccessResponse | ErrorResponse> {
        return this.userService.getUserList().then(users => {
            return users;
        });
    }

    @Get('/user/:userId')
    async getUserDetails(@Param('userId') userId: number): Promise<SuccessResponse | ErrorResponse> {
        return this.userService.getUserDetails(userId).then(users => {
            return users;
        });
    }

    @Post('/saveuser')
    async saveUser(@Body() user: User): Promise<SuccessResponse | ErrorResponse> {
        return this.userService.saveUser(user).then(data => {
            return data;
        });
    }

    @Delete('/deleteuser/:userId')
    async deleteUser(@Param('userId') userId: number): Promise<SuccessResponse | ErrorResponse> {
        return this.userService.deleteUser(userId).then(data => {
            return data;
        });
    }
}