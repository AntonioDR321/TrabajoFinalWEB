import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserDetail.css';
import { ReactComponent as BackIcon } from '../assets/back-icon.svg';

function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // ← usamos `id`, no `email`

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGoBack = () => {
    navigate('/usuarios');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Error al obtener datos del usuario');
        }

        const data = await res.json();
        setUserData(data.body); // ← tu backend responde con { body: usuario }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="loading-message">Cargando...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!userData) return <p className="error-message">Usuario no encontrado</p>;

  return (
    <div className="user-detail-container">
      <div className="user-detail-card">
        <div className="detail-header">
          <button className="back-button" onClick={handleGoBack}>
            <BackIcon className="back-icon" />
            <span>Regresar</span>
          </button>
          <h2>Detalles del Usuario</h2>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>Nombre:</label>
            <div className="detail-value">{userData.nombre} {userData.apellido}</div>
          </div>

          <div className="detail-item">
            <label>Correo electrónico:</label>
            <div className="detail-value">{userData.correo}</div>
          </div>

          <div className="detail-item">
            <label>Rol:</label>
            <div className="detail-value">{userData.id_rol || '—'}</div>
          </div>

          <div className="detail-item">
            <label>Estado:</label>
            <div className="detail-value">{userData.estado}</div>
          </div>

          <div className="detail-item">
            <label>Fecha de registro:</label>
            <div className="detail-value">{userData.fecha_registro}</div>
          </div>

          <div className="detail-item">
            <label>Teléfono:</label>
            <div className="detail-value">{userData.telefono}</div>
          </div>

          <div className="detail-item">
            <label>Evaluaciones completadas:</label>
            <div className="detail-value">—</div> {/* por ahora vacío */}
          </div>

          <div className="detail-item">
            <label>Departamento:</label>
            <div className="detail-value">—</div> {/* por ahora vacío */}
          </div>

          <div className="detail-item">
            <label>Último acceso:</label>
            <div className="detail-value">—</div> {/* por ahora vacío */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
