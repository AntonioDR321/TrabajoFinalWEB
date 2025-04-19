import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const { currentUser, token, login } = useAuth();

  // Redirigir si no hay usuario (de forma segura para los hooks)
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Si no hay usuario, no renderizamos el componente aún
  if (!currentUser) return null;

  const [formData, setFormData] = useState({
    id: currentUser.id,
    nombre: currentUser.nombre || '',
    apellido: currentUser.apellido || '',
    correo: currentUser.correo || '',
    telefono: currentUser.telefono || '',
    fecha_registro: currentUser.fecha_registro || '',
    estado: currentUser.estado || '',
    id_rol: currentUser.id_rol || '',
    usuario: currentUser.usuario || '',
    contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error al guardar perfil');
      }

      login({ ...formData, contraseña: undefined }, token);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={process.env.PUBLIC_URL + '/default-avatar.png'} alt="User avatar" />
            <div className="upload-overlay">
              <span>Cambiar foto</span>
            </div>
          </div>
          <button className="save-button" form="profile-form">
            Guardar
          </button>
        </div>
        
        <form id="profile-form" className="edit-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input 
              type="text" 
              id="nombre"
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input 
              type="text" 
              id="apellido"
              name="apellido" 
              value={formData.apellido} 
              onChange={handleChange} 
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="correo">Correo:</label>
            <input 
              type="email" 
              id="correo"
              name="correo" 
              value={formData.correo} 
              onChange={handleChange} 
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input 
              type="tel" 
              id="telefono"
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="usuario">Usuario (login):</label>
            <input 
              type="text" 
              id="usuario"
              name="usuario" 
              value={formData.usuario} 
              onChange={handleChange} 
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contraseña">Nueva contraseña:</label>
            <input 
              type="password" 
              id="contraseña"
              name="contraseña" 
              value={formData.contraseña} 
              onChange={handleChange} 
              placeholder="Dejar vacío para no cambiar"
            />
          </div>
        </form>
        
        <div className="button-group">
          <button className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
