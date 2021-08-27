import { Injectable } from '@nestjs/common';
import { UserQuery } from './query/user.query';
import { User } from './dto/user.dto';
import { Validators } from '../validators/validators';
import { SuccessResponse } from 'src/common/dto/success.dto';
import { ErrorResponse } from 'src/common/dto/error.dto';

@Injectable()
export class UserService {
    private userQuery: UserQuery;

    constructor() {
        this.userQuery = new UserQuery();
    }

    async getUserList(): Promise<SuccessResponse | ErrorResponse> {
        try {   
            const list = await this.userQuery.getUserList();
        
            return {
                status: true,
                data: list
            }
        } 
        catch(ex) 
        {
            return {
                status: false,
                error: ex
            }
        }
    }

    async getUserDetails(id: number): Promise<SuccessResponse | ErrorResponse> {
        try {   
            const errors = Validators.NumberValidator("id", id.toString(), true);
        
            if (errors.length > 0) {
                return {
                    status: false,
                    error: errors
                }
            } 
            else {
                const list = await this.userQuery.getUserDetails(id);
    
                return {
                    status: true,
                    data: list
                }
            }
        } 
        catch(ex) 
        {
            return {
                status: false,
                error: ex
            }
        }
    }

    async saveUser(user: User): Promise<SuccessResponse | ErrorResponse> {
        let errors = [];
        const errors1 = Validators.StringValidator("firstName", user.firstName, true, "text", 3, 50);
        const errors2 = Validators.StringValidator("lastName", user.lastName, true, "text", 3, 50);
        const errors3 = Validators.NumberValidator("age", user.age.toString(), true);
        const errors4 = Validators.StringValidator("gender", user.gender, true, "text", 4, 6);

        errors = [...errors1, ...errors2, ...errors3, ...errors4];

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        } 
        else {
            const newId = await this.userQuery.saveUser(user);

            return {
                status: true,
                data: [{
                    id: newId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    gender: user.gender
                }]
            }
        }
    }

    async deleteUser(id: number): Promise<SuccessResponse | ErrorResponse> {
        const errors = Validators.NumberValidator("id", id.toString(), true);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        } 
        else {
            const deleteId = await this.userQuery.deleteUser(id);

            return {
                status: true,
                data: deleteId
            }
        }
    }
}