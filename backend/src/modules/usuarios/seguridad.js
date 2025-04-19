const auth = require('../../auth');

module.exports = function CheckAuth(){

    function middleware(req, res, next){
        try {
            auth.chequearToken.confirmarToken(req);
            next();
        } catch (err) {
            res.status(401).json({ error: 'Token inválido o ausente' });
        }
    }

    return middleware;
}
