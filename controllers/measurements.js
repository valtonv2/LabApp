const measurementRouter = require('express').Router()
const dbOps = require('../utils/dbutils')



//Get all measurements

measurementRouter.get('/', (request, response) => {
    
    dbOps.getall().then(data => response.json(data))

})


module.exports = measurementRouter 