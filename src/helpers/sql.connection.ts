const mysql = require('mysql2');

export default class SqlConnection {
    CreateConnectionPool = () => {
        return mysql.createPool({
            host: 'localhost',
            database: 'dbhrms',
            user: 'root',
            password: 'Semaphore@123',
            waitForConnections: true,
            queueLimit: 10
        }).promise();
    };
}