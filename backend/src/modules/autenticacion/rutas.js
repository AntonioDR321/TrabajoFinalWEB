const express = require('express');

const respuesta = require('../../red/responses')
const controlador = require('./index')
const seguridad = require('../usuarios/seguridad');


const router = express.Router();

router.post('/login', login)
router.put('/reset', seguridad(), resetPassword);


async function login (req, res, next) {
    try{
      const token = await controlador.login(req.body.usuario, req.body.contraseña)
      respuesta.success(req, res, token, 200)
    }catch(err){
      next(err)
    }
  };

  
async function resetPassword(req, res, next) {
    try {
      const userId = req.user.id; // Viene del token decodificado
      const nuevaContraseña = req.body.contraseña;
  
      if (!nuevaContraseña) {
        return respuesta.error(req, res, 'La nueva contraseña es requerida', 400);
      }
  
      await controlador.ResetPassword(userId, nuevaContraseña);
      respuesta.success(req, res, 'Contraseña actualizada correctamente', 200);
    } catch (err) {
      next(err);
    }
  }
  

module.exports =router;
