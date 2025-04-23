// src/components/EditProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
  const token = currentUser?.token;

  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    fecha_registro: '',
    estado: '',
    id_rol: '',
    usuario: '',
    contraseña: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Extraer el ID del usuario del token
    const getUserData = async () => {
      try {
        // Decodificar el payload del JWT para extraer el id
        const [, payloadBase64] = token.split('.');
        const { id } = JSON.parse(atob(payloadBase64));
        
        // Cargar los datos completos del usuario desde la API
        const res = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!res.ok) throw new Error('No se pudo cargar el perfil');
        
        const data = await res.json();
        // Manejar la respuesta que tiene .body como array o como objeto
        const userData = Array.isArray(data.body) ? data.body[0] : data.body;
        
        setFormData({
          id: userData.id, // Asegurarnos de que tengamos el ID correcto
          nombre: userData.nombre || '',
          apellido: userData.apellido || '',
          correo: userData.correo || '',
          telefono: userData.telefono || '',
          fecha_registro: userData.fecha_registro || '',
          estado: userData.estado || '',
          id_rol: userData.id_rol || '',
          usuario: userData.usuario || '',
          contraseña: ''
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error al cargar datos del usuario:", err);
        alert("Error al cargar los datos del perfil");
        navigate('/profile');
      }
    };

    if (token) {
      getUserData();
    }
  }, [currentUser, navigate, token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleSave = async e => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        fecha_registro: formData.fecha_registro || null,
        estado: formData.estado || null,
        id_rol: formData.id_rol || null
      };

      if (!formData.contraseña) {
        delete payload.contraseña;
      }

      console.log("Enviando datos al servidor:", payload); // Para depuración

      const res = await fetch('http://localhost:4000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error al guardar perfil');
      }

      login({ ...formData, token, contraseña: undefined });
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={process.env.PUBLIC_URL + '/default-avatar.png'} alt="Avatar de usuario" />
            <div className="upload-overlay"><span>Cambiar foto</span></div>
          </div>
          <button className="save-button" form="profile-form">Guardar</button>
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
            <label htmlFor="usuario">Usuario (inicio de sesión):</label>
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
          <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;