// define variables
let mongoose = require("mongoose");
let itemModel = require("./schema/item");

const server = "127.0.0.1:27017";
const database = "item";   // replace w/ db name, name of js in schema

// making my database
class Database{
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log("Database connection successful")
      })
      .catch(err => {
        console.error("Database connection error")
      })
  }
}

module.exports = new Database()
