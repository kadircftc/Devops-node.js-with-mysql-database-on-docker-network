const config=require("../config")
const mysql = require('mysql2');

const db = require('knex')({
    client: 'mysql2',
    connection: config.mysqlDb
    ,
});
module.exports = db;