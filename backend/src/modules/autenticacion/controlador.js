const TABLA = 'autenticacion'
const auth = require('../../auth')
const bcrypt = require('bcrypt')
module.exports = function (dbInyected){
  
  let db = dbInyected

if(!dbInyected) {
  db = require('../../DB/mysql')
}

async function login(usuario, contraseña) {
  const data = await db.query(TABLA, { usuario });

  if (!data || data.length === 0) {
    console.log('❌ Usuario no encontrado en la BD');
    throw new Error('Usuario no encontrado');
  }

  console.log('✅ Usuario encontrado:', data[0]);

  const match = await bcrypt.compare(contraseña, data[0].contraseña);
  console.log('🔐 Resultado bcrypt.compare:', match);

  if (!match) {
    throw new Error('Contraseña incorrecta');
  }

  const { contraseña: _, ...userWithoutPassword } = data[0];
  return auth.asignarToken(userWithoutPassword);
}



  async function ResetPassword(id, nuevaContraseña) {
    const contraseñaHasheada = await bcrypt.hash(nuevaContraseña.toString(), 5);
  
    const data = {
      id: id,
      contraseña: contraseñaHasheada
    };
  
    return db.Update(TABLA, data);
  }
  
  
  async function Add(data) {
    console.log('autenticacion.Add con data:', data); // DEBUG 7

    const authData = {
      id: data.id 
    }
    if(data.usuario){
      authData.usuario = data.usuario
    }
    if(data.contraseña){
      authData.contraseña = await bcrypt.hash(data.contraseña.toString(), 5)
    }

    return db.Add(TABLA, authData)
  }
  
  return{
     Add, login, ResetPassword
  }
}