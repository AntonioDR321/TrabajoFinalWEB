const TABLA = 'usuarios'
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
  
  function Add(body) {
    return db.Add(TABLA, body)
  }
  
  return{
    All, One, Delete, Add
  }
}