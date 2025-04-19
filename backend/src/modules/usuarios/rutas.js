const express = require('express');


const respuesta = require('../../red/responses')
const seguridad = require('./seguridad')
const controlador = require('./index')

const router = express.Router();

router.get('/', All)
router.get('/:id', One)
router.put('/', seguridad(), Delete)
router.post('/', Add)

async function All(req, res, next) {
  try{
    const todos = await controlador.All()
  respuesta.success(req, res, todos, 200)
  }catch(err){
    next(err)
  }
};


async function One(req, res, next) {
  try{
    const todos = await controlador.One(req.params.id)
    respuesta.success(req, res, todos, 200)
  }catch(err){
    next(err)
  }
};

async function Add(req, res, next) {
  console.log('Entró a router.post /api/usuarios'); // DEBUG 1

  try{
    const todos = await controlador.Add(req.body)
    console.log('controlador.Add terminó', todos)
    if(req.body.id == 0){
       mensaje = 'Item agregado satisfactoriamente'
    }else{
      mensaje = 'Item actualizado satisfactoriamente'
    }
    respuesta.success(req, res, mensaje, 201)
  }catch(err){
    console.error('Error en Add:', err);
    next(err)
  }
};

async function Delete(req, res, next) {
  try{
    const todos = await controlador.delete(req.body)
    respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200)
  }catch(err){
    next(err)
  }
};


module.exports =router;
