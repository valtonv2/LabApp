const sqlite3 = require('sqlite3').verbose()
const config = require('./config')


//Connect to database

let dbPath = config.DBPATH

let dbErrorhandler = (err) => {
   
    if(err){
        return console.error(err.message)
    }
    console.log('Connection to in-memory database established')

}

const runAsyncSql = (sql) => {

    let db = new sqlite3.Database(dbPath, dbErrorhandler)
   
    return new Promise((resolve, reject) => {
     db.run(sql,[], (err) => {

            if(err) reject(err)
            else{
            console.log("data ")
            db.close()
            resolve("Ok")
            }

         })
    })

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

//Method for deleting a measurement by id from database

const deleteMeasurement = (id) => {

    let db = new sqlite3.Database(dbPath, dbErrorhandler)
    let sql = 'DELETE FROM measurements WHERE id = (?)'
    console.log(sql)
    return new Promise((resolve, reject) => {
        db.run(sql, id, (err) => {
   
            db.close()
            
            if(err) reject(err)
            else resolve(id)
               
            })
       })
}

const updateMeasurement = (id, newData) => {

    let db = new sqlite3.Database(dbPath, dbErrorhandler)
    console.log('Equality', id === newData.id)
    let sql = `UPDATE measurements
               SET id = (?), 
               name = (?),
               healthyupper = (?),
               healthylower = (?)
               WHERE id = (?)`
    console.log(sql)

    let preparedData = Object.values(newData).concat(id)
    
    return new Promise((resolve, reject) => {
        db.run(sql, preparedData, function(err){
   
            console.log('Changes: ', this.changes)
            db.close()
            
            
            if(err){reject(err)}
            else{
                console.log('Changes: ', this.changes)
                resolve(newData)
            } 
               
            })
       })

}

//Example measurements for use in tests

const examples = [

    {
        "id": "1",
        "name": "hemoglobin",
        "healthyupper": 0.3,
        "healthylower": 0.1
    },
    {
        "id": "2",
        "name": "temperature",
        "healthyupper": 37.5,
        "healthylower": 35
    }

]














const dbOps = {

    getAll() {return getAllMeasurements()},
    
    addOne(data) {return addMeasurement(data)},

    deleteOne(id) {return deleteMeasurement(id)},

    updateOne(id, newData) {return updateMeasurement(id, newData)},

    runSql(sql) {return runAsyncSql(sql)},

    examples: examples





}



module.exports = dbOps