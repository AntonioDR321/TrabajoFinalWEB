import React, { useState, useEffect } from 'react';
import './Users.css';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';

const roles = {
  1: 'Administrador',
  2: 'Evaluador',
  3: 'Supervisor'
};

const estados = {
  1: 'Activo',
  2: 'Inactivo',
  3: 'Suspendido'
};

function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/api/usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log('Respuesta del backend:', data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.body)) {
          setUsers(data.body);
        }        
        else {
          console.error('La respuesta de usuarios no es un array:', data.body);
        }
      } catch (err) {
        console.error('Error al obtener usuarios:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    `${user.nombre} ${user.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="search-filter-bar">
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar usuarios"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className="filter-button">Agregar filtro</button>
      </div>

      <div className="users-table-container">
        <h2>Usuarios</h2>
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{`${user.nombre} ${user.apellido}`}</td>
                    <td>{user.correo}</td>
                    <td>{roles[user.id_rol] || 'Desconocido'}</td>
                    <td>{estados[user.estado] || 'Desconocido'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
