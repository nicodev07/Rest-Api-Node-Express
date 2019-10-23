import mysql from 'promise-mysql';
//import mysql from 'mysql';
import keys from './keys';

//Crear conexión
const pool = mysql.createPool(keys.database);

pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log("DB Connected!");
});

export default pool;

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