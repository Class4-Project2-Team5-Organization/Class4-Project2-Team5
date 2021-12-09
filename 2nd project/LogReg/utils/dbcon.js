const mysql = require("mysql");
const config = require("./productDbconfig.json")

module.exports = mysql.createPool(config);