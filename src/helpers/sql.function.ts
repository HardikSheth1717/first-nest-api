import { SqlCommon } from './dto/sql.dto';
import sqlConnection from './sql.connection';

export class SqlFunction {
    private sqlPool: any;

    constructor() {
        this.sqlPool = new sqlConnection().CreateConnectionPool();
    }

    Get = async (obj: SqlCommon): Promise<[]> => {
        const [data] = await this.sqlPool.execute(`
            SELECT ${obj.columns.join(',')}
            FROM ${obj.table}
        `);

        return data;
    }

    GetById = async (obj: SqlCommon): Promise<[]> => {
        const [data] = await this.sqlPool.execute(`
            SELECT ${obj.columns.join(',')}
            FROM ${obj.table}
            WHERE ${obj.keyName} = ?
        `, [obj.keyValue]);

        return data;
    }

    Create = async (obj: SqlCommon): Promise<number> => {
        const columns = Object.keys(obj.data);
        const data = Object.values(obj.data);
        let placeHolders = data.map(element => {
            return "?";
        })

        const [inserted] = await this.sqlPool.execute(`
            INSERT INTO ${obj.table} (${columns.join(',')})
            VALUES (${placeHolders.join(',')})`
            , data);

        return parseInt(inserted["insertId"]);
    }

    Update = async (obj: SqlCommon): Promise<number> => {
        const columns = Object.keys(obj.data);
        const data = Object.values(obj.data);

        const [updated] = await this.sqlPool.execute(`
            UPDATE ${obj.table}
            SET ${columns.join(' = ?, ')} = ?
            WHERE ${obj.keyName} = ?`
            , [...data, obj.keyValue]);

        return parseInt(updated["affectedRows"]) > 0 ? obj.keyValue : 0;
    }

    Delete = async (obj: SqlCommon): Promise<number> => {
        const [data] = await this.sqlPool.execute(`
            DELETE
            FROM ${obj.table}
            WHERE ${obj.keyName} = ?`
            , [obj.keyValue]);

        return parseInt(data["affectedRows"]) > 0 ? obj.keyValue : 0;
    }

    Execute = async (query: string): Promise<[]> => {
        const [data] = await this.sqlPool.execute(query);
        return data;
    }
}