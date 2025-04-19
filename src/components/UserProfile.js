import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';
import { ReactComponent as LogoutIcon } from '../assets/logout-icon.svg';

const roles = {
  1: 'Administrador',
  2: 'Evaluador',
  3: 'Supervisor'
};

function UserProfile() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  // 1) Si no hay token, redirige al login
  useEffect(() => {
    if (!currentUser?.token) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // 2) Obtener el perfil completo desde /api/usuarios/:id
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = currentUser.token;
        // Decodificar el payload del JWT para extraer el id
        const [, payloadBase64] = token.split('.');
        const { id } = JSON.parse(atob(payloadBase64));

        const res = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('No se pudo cargar el perfil');
        const data = await res.json();
        // tu respuesta tiene .body quizá como array o como objeto
        const user = Array.isArray(data.body) ? data.body[0] : data.body;
        setProfile(user);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    if (currentUser?.token) {
      loadProfile();
    }
  }, [currentUser]);

  const handleEdit = () => {
    navigate('/profile/edit');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) return null;             // todavía no sabemos si hay sesión
  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>Cargando perfil…</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={process.env.PUBLIC_URL + '/default-avatar.png'} alt="Avatar" />
          </div>
          <button className="edit-button" onClick={handleEdit}>
            Editar
          </button>
        </div>

        <div className="profile-details">
          <div className="profile-item">
            <label>Nombre:</label>
            <span>{`${profile.nombre} ${profile.apellido}`}</span>
          </div>

          <div className="profile-item">
            <label>Correo:</label>
            <span>{profile.correo}</span>
          </div>

          <div className="profile-item">
            <label>Teléfono:</label>
            <span>{profile.telefono}</span>
          </div>

          <div className="profile-item">
            <label>Rol:</label>
            <span>{roles[profile.id_rol] || 'Desconocido'}</span>
          </div>

          <div className="profile-item">
            <label>Fecha de registro:</label>
            <span>{new Date(profile.fecha_registro).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="logout-section">
          <button className="logout-button" onClick={handleLogout}>
            <LogoutIcon className="logout-icon" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
