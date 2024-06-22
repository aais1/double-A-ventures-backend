const mysql=require('mysql2')
    const connection = mysql.createPool({
        connectionLimit:10,
        host: "localhost",
        user: "admin",
        password: "admin",
        database: "test",
      });

      console.log('db up')

module.exports={
    connection
}