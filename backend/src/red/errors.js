const respuesta = require('./responses')

function errors(err, req, res, next){
    console.log('[Error]', err)
    const message = err.message || 'Internal Server Error'
    const status = err.status || 500
    respuesta.error(req, res, message, status)
} 

module.exports = errors;