"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
//import mysql from 'mysql';
const keys_1 = __importDefault(require("./keys"));
//Crear conexión
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log("DB Connected!");
});
exports.default = pool;
/*const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin"
})

con.connect(function(err){
    if(err) throw err;
    console.log("DB Connected!");
});

export default con;*/ 
