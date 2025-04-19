const TABLA = 'usuarios'
const autenticacion = require('../autenticacion')
module.exports = function (dbInyected){
  
  let db = dbInyected

if(!dbInyected) {
  db = require('../../DB/mysql')
}

  function All() {
    return db.All(TABLA)
  } 
  
  function One(id) {
    return db.One(TABLA, id)
  }
  
  function Delete(body) {
    return db.Delete(TABLA, body)
  }
  
  async function Add(body) {
    console.log('Entró a controlador.Add con body:', body); // DEBUG 4

    const usuario = {
      id: body.id,
      nombre: body.nombre,
      apellido: body.apellido,
      correo: body.correo,
      telefono: body.telefono,
      fecha_registro : body.fecha_registro,
      estado : body.estado,
      id_rol : body.id_rol,
    }
    const respuesta = await db.Add(TABLA, usuario)
    console.log('Insert en usuarios exitoso', respuesta); // DEBUG 5

    var insertId = 0
    if(body.id == 0){
      insertId = respuesta.insertId
    }else{
      insertId = body.id
    }
     
    var respuesta2 = ''
    if(body.usuario || body.contraseña){
      respuesta2 = await autenticacion.Add({
        id: insertId,
        usuario: body.usuario,
        contraseña: body.contraseña,
        
    })
    console.log('Insert en autenticacion exitoso', respuesta2); // DEBUG 6

  }
  
    return respuesta2;
  }

  return {
    All, One, Delete, Add
  }
}