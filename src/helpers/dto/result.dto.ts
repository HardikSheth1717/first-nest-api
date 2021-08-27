import IResult from '../interfaces/result.interface';

export class SqlResult implements IResult {
    affectedRows: number;
    fieldCount: number;
    info: string;
    insertId: number;
    serverStatus: number;
    warningStatus: number;
}