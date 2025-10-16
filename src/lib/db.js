import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST || 'mysql.railway.internal',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'KaacpakIEqLMFvZpHxQZpgEfAjtvHIsJ',
  database: process.env.MYSQL_DATABASE || 'railway',
  port: process.env.MYSQL_PORT || 3306,
});
