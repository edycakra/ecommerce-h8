const errorHandlers = (err, req, res, next) => {
    let status = 500
    let errors = []
    const errorObj = {
      status,
      errors,
      message: ''
    }
  
    switch (err.name) {
        case 'SequelizeValidationError':
            errorObj.message = 'Bad Request'
            errorObj.status = 400
            for (const er of err.errors) {
              errorObj.errors.push(er.message)
            }
            res.status(status).json(errorObj)
            break;
        case 'JsonWebTokenError':
            errorObj.message = err.name
            errorObj.errors.push(err.message)
            errorObj.status = 400
            res.status(status).json(errorObj)
            break;   
        default:
            status = err.status || 500
            errorObj.status = status
            errorObj.message = err.name || 'Invalid Server Error'
            errorObj.errors.push(err.message)
            res.status(status).json(errorObj)
            break;
        }
}
  
module.exports = errorHandlers