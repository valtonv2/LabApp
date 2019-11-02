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
               SET name = '${newData.name}'
               WHERE id = "(?)"`
    console.log(sql)
    
    return new Promise((resolve, reject) => {
        db.run(sql, id, function(err){
   
            console.log('Changes: ', this.changes)
            db.close()
            
            
            if(err){ reject(err)}
            else{
                console.log('Changes: ', this.changes)
                resolve(newData)
            } 
               
            })
       })

}










const dbOps = {

    getAll() {return getAllMeasurements()},
    
    addOne(data) {return addMeasurement(data)},

    deleteOne(id) {return deleteMeasurement(id)},

    updateOne(id, newData) {return updateMeasurement(id, newData)}





}



module.exports = dbOps