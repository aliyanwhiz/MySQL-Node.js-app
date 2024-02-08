const mysql = require('mysql2')
let myconnection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "students"
})

let config = myconnection.connect((err) => {
    if(err)
    {
        console.log('connection is dead : '+JSON.stringify(err,undefined,2));
    }
    else{
        console.log('connection successful');
    }
})

module.exports = myconnection