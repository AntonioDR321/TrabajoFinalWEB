const express = require('express')
const morgan = require('morgan')
const config  = require('./config')
const cors = require('cors')
 
const categorias = require('./modules/categorias/rutas')
const usuarios = require('./modules/usuarios/rutas')
const criterios_evaluacion = require('./modules/criterios_evaluacion/rutas')
const estado_categorias = require('./modules/estado_categorias/rutas')
const estado_partida = require('./modules/estado_partida/rutas')
const estado_producto = require('./modules/estado_producto/rutas')
const estado_resultados = require('./modules/estado_resultados/rutas')
const estado_usuario = require('./modules/estado_usuario/rutas')
const evaluaciones = require('./modules/evaluaciones/rutas')
const historial_acciones = require('./modules/historial_acciones/rutas')
const pais = require('./modules/pais/rutas')
const partidas_arancelarias = require('./modules/partidas_arancelarias/rutas')
const productos = require('./modules/productos/rutas')
const resultados_evaluacion = require('./modules/resultados_evaluacion/rutas')
const rol = require('./modules/rol/rutas')
const subcategorias = require('./modules/subcategorias/rutas')
const tipo_criterio = require('./modules/tipo_criterio/rutas')
const autenticacion = require('./modules/autenticacion/rutas')
const tipo_evaluacion = require('./modules/tipo_evaluacion/rutas') 

const error = require('./red/errors')

const app = express()
app.use(cors());


//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/categorias', categorias)
app.use('/api/usuarios', usuarios)
app.use('/api/criterios_evaluacion', criterios_evaluacion)
app.use('/api/estado_categorias', estado_categorias)
app.use('/api/estado_partida', estado_partida)
app.use('/api/estado_producto', estado_producto)
app.use('/api/estado_resultados', estado_resultados)
app.use('/api/estado_usuario', estado_usuario)
app.use('/api/evaluaciones', evaluaciones)
app.use('/api/historial_acciones', historial_acciones)
app.use('/api/pais', pais)
app.use('/api/partidas_arancelarias', partidas_arancelarias)
app.use('/api/productos', productos)
app.use('/api/resultados_evaluacion', resultados_evaluacion)
app.use('/api/rol', rol)
app.use('/api/subcategorias', subcategorias)
app.use('/api/tipo_criterio', tipo_criterio)
app.use('/api/autenticacion', autenticacion)
app.use('/api/tipo_evaluacion', tipo_evaluacion)



app.use(error);

module.exports = app;