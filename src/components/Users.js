import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Users.css';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';

const roles = {
  1: 'Administrador',
  2: 'Evaluador',
  3: 'Supervisor'
};

function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/usuarios`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.body)) {
          setUsers(data.body);
        }
      })
      .catch(err => console.error('Error al obtener usuarios:', err));
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
                <th>Usuarios</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{`${user.nombre} ${user.apellido}`}</td>
                  <td>{user.correo}</td>
                  <td>{roles[user.id_rol] || 'Desconocido'}</td>
                  <td>{user.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
