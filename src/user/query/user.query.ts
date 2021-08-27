import { SqlFunction } from '../../helpers/sql.function';
import { User } from '../dto/user.dto';

export class UserQuery {
    private sql: SqlFunction;

    constructor() {
        this.sql = new SqlFunction();
    }

    async getUserList(): Promise<User[]> {
        return this.sql.Get({
            table: 'users',
            columns: ['*']
        });
    }

    async getUserDetails(id: number): Promise<User[]> {
        return this.sql.GetById({
            table: 'users',
            columns: ['*'],
            keyValue: id,
            keyName: "Id"
        });
    }

    async saveUser(user: User): Promise<number> {
        if (user.id === 0) {
            return await this.sql.Create({
                table: "users",
                data: {
                    id: 0,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    gender: user.gender
                }
            });
        } else {
            return await this.sql.Update({
                table: "users",
                data: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    gender: user.gender
                },
                keyName: "Id",
                keyValue: user.id
            });
        }
    }

    async deleteUser(id: number): Promise<number> {
        return await this.sql.Delete({
            table: "users",
            keyName: "Id",
            keyValue: id
        });
    }
}