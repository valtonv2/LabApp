const sqlite3 = require('sqlite3').verbose()
const config = require('./config')


//Connect to database

let dbPath = config.DBPATH

let dbErrorHandler = (err) => {
   
    if(err){
        return console.error(err.message)
    }
    console.log('Connection to in-memory database established')

}

const ensureDb = async () => {

    const sql = 'CREATE TABLE IF NOT EXISTS "measurements" ( `id` TEXT NOT NULL, `name` TEXT NOT NULL, `healthyupper` INTEGER NOT NULL, `healthylower` INTEGER NOT NULL )'
    await runAsyncSql(sql, 'run', [])

    console.log('Database ensured')
    
}


const runAsyncSql = (sql, method, data) => {

    let db = new sqlite3.Database(dbPath, dbErrorHandler)
   
    return new Promise((resolve, reject) => {
    
     if(method === 'run'){    
    
         db.run(sql,data, (err, rows) => {

               if(err) reject(err)
               else{
               db.close()
               if(data && data.length >= 1) resolve(data)
               else if(rows) resolve(rows)
               else resolve("Ok")
               }

              })
     }else{
        db.all(sql,data, (err, rows) => {

            if(err) reject(err)
            else{
            db.close()
            if(data && data.length >= 1) resolve(data)
            else if(rows) resolve(rows)
            else resolve("Ok")
            }

           })
     }
    })

}


//Method for getting all measurements in database

const getAllMeasurements = () => {
    
   
    let sql = 'SELECT * FROM measurements'
    
    return runAsyncSql(sql, 'all', [])
}

//Method for adding a single measurement to database
const addMeasurement = (measurementData) => {

    let dataPrepared = Object.values(measurementData)

    let sql = 'INSERT INTO measurements (id, name, healthyupper, healthylower) VALUES (?,?,?,?) '
    
    return runAsyncSql(sql, 'run', dataPrepared)
}

//Method for deleting a measurement by id from database

const deleteMeasurement = (id) => {

    let sql = 'DELETE FROM measurements WHERE id = (?)'
   
    return runAsyncSql(sql, 'run', id)
    
}

const updateMeasurement = (id, newData) => {

    let sql = `UPDATE measurements
               SET id = (?), 
               name = (?),
               healthyupper = (?),
               healthylower = (?)
               WHERE id = (?)`
    
    let preparedData = Object.values(newData).concat(id)
    
    return runAsyncSql(sql, 'run', preparedData)

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

    ensureDB() {return ensureDb()},

    examples: examples


}



module.exports = dbOps