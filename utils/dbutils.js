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
   
    return new Promise((resolve, reject) => {
     db.all(sql,[], (err,rows) => {

            if(err) reject(err)
            else{
            console.log("data ", rows)
            db.close()
            resolve(rows)
            }

         })
    })
}

//Method for adding a single measurement to database
const addMeasurement = (measurementData) => {

    let dataPrepared = Object.values(measurementData)

    let db = new sqlite3.Database(dbPath, dbErrorhandler)
    let sql = 'INSERT INTO measurements (id, name, healthyupper, healthylower) VALUES (?,?,?,?) '
    console.log(sql)
    return new Promise((resolve, reject) => {
        db.run(sql, dataPrepared, (err) => {
   
            db.close()
            
            if(err) reject(err)
            else resolve(measurementData)
               
            })
       })
}

const dbOps = {

    getAll() {return getAllMeasurements()},
    
    addOne(data) {return addMeasurement(data)}

}



module.exports = dbOps