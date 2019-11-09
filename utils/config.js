/* eslint-disable linebreak-style */
require('dotenv').config()

let PORT = process.env.PORT
let DBPATH = './MeasurementDB.db'

if(process.env.NODE_ENV === 'test'){

  DBPATH = './testDB.db'

}

module.exports = { PORT, DBPATH }