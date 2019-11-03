const errorHandler = function (err, req, res, next){

    console.log("Error handler functioning")
    console.error(err.message)
    res.status(400).send({
        errorName: err.name,
        errorMessage: err.message
    })


}

module.exports = errorHandler