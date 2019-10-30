const sqlite3 = require('sqlite3').verbose()

//Connect to database

let dbPath = './MeasurementDB.db'

let dbErrorhandler = (err) => {
   
    if(err){
        return console.error(err.message)
    }
    console.log('Connection to in-memory database established')

}


//Method for getting all measurements in database
const getAllMeasurements = () => {
    
    let db = new sqlite3.Database(dbPath, dbErrorhandler)
    let sql = 'SELECT * FROM measurements'

    const promise = new Promise(
        
        db.all(sql,[], (err,rows) => {

        if(err) throw err
        console.log("data ", rows)
        return rows

         })
    )

    db.close()

    return promise

}

const dbOps = {

    getall() {getAllMeasurements()}

}



module.exports = dbOps