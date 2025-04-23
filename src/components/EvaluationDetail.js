// src/components/EvaluationDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos el contexto de autenticación
import './EvaluationDetail.css';
import { ReactComponent as BackIcon } from '../assets/back-icon.svg';

function EvaluationDetail() {
  const { id } = useParams();                 // si hay :id, estamos en modo lectura
  const isCreateMode = !id;                   // si no hay id, estamos creando
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Obtenemos el usuario actual del contexto
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    id_producto: '',
    id_usuario: '',
    id_tipo_evaluacion: '',
    fecha_evaluacion: new Date().toISOString().slice(0, 10),
    observaciones: ''
  });
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios]   = useState([]);
  const [tiposEval, setTiposEval] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    (async () => {
      try {
        // Obtener el ID del usuario actual desde el token
        if (token && isCreateMode) {
          try {
            const [, payloadBase64] = token.split('.');
            const { id } = JSON.parse(atob(payloadBase64));
            setCurrentUserId(id.toString());
          } catch (err) {
            console.error('Error al decodificar el token:', err);
          }
        }
        
        // 1) Cargar catálogos en paralelo
        const [prodRes, userRes, tipoRes] = await Promise.all([
          fetch('http://localhost:4000/api/productos',       { headers }),
          fetch('http://localhost:4000/api/usuarios',        { headers }),
          fetch('http://localhost:4000/api/tipo_evaluacion', { headers })
        ]);
        const [{ body: prods }, { body: usrs }, { body: tips }] =
          await Promise.all([prodRes.json(), userRes.json(), tipoRes.json()]);

        setProductos(prods);
        setUsuarios(usrs);
        setTiposEval(tips);
        
        // Buscar el nombre del usuario actual si tenemos su ID
        if (currentUserId) {
          const currentUser = usrs.find(u => u.id.toString() === currentUserId);
          if (currentUser) {
            setCurrentUserName(`${currentUser.nombre} ${currentUser.apellido}`);
          }
        }

        // 2) Si venimos a leer, traemos la evaluación
        if (!isCreateMode) {
          const evRes  = await fetch(`http://localhost:4000/api/evaluaciones/${id}`, { headers });
          const evJson = await evRes.json();
          let d = evJson.body;
          if (Array.isArray(d)) d = d[0] || {};  // si body es array, tomamos el primero
          setFormData({
            id:                  d.id?.toString()                 || '',
            id_producto:         d.id_producto?.toString()        || '',
            id_usuario:          d.id_usuario?.toString()         || '',
            id_tipo_evaluacion:  d.id_tipo_evaluacion?.toString() || '',
            fecha_evaluacion:    d.fecha_evaluacion?.slice(0,10)  || '',
            observaciones:       d.observaciones                  || ''
          });
        } else {
          // En modo crear, asignamos automáticamente el ID del usuario actual
          setFormData(prev => ({
            ...prev,
            id_usuario: currentUserId
          }));
        }
      } catch (err) {
        console.error('Error cargando datos:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isCreateMode, token, currentUserId]);

  const handleGoBack = () => {
    navigate(isCreateMode ? '/dashboard' : '/evaluaciones');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:4000/api/evaluaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          id: isCreateMode ? 0 : formData.id   // id=0 para crear, o el existente para editar
        })
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al guardar evaluación:', err);
    }
  };

  if (loading) {
    return <div className="evaluation-detail-container">Cargando...</div>;
  }

  // Mapeos para mostrar en modo lectura
  const nombreProducto = productos.find(p => p.id.toString() === formData.id_producto)?.nombre || '—';
  const usuarioObj    = usuarios.find(u => u.id.toString() === formData.id_usuario);
  const nombreUsuario = usuarioObj ? `${usuarioObj.nombre} ${usuarioObj.apellido}` : currentUserName || '—';
  const nombreTipo    = tiposEval.find(t => t.id.toString() === formData.id_tipo_evaluacion)
                            ?.nombre_tipo_evaluacion || '—';

  return (
    <div className="evaluation-detail-container">
      <div className="evaluation-detail-card">
        <div className="detail-header">
          <button className="back-button" onClick={handleGoBack}>
            <BackIcon className="back-icon" /><span>Regresar</span>
          </button>
          <h2>{isCreateMode ? 'Nueva Evaluación' : 'Detalle de Evaluación'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ID */}
          <div className="detail-item">
            <label>ID Evaluación:</label>
            <div className="detail-value">
              {isCreateMode ? 'Pendiente' : formData.id}
            </div>
          </div>

          {/* Producto */}
          <div className="detail-item">
            <label>Producto:</label>
            {isCreateMode ? (
              <select
                name="id_producto"
                value={formData.id_producto}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un producto</option>
                {productos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            ) : (
              <div className="detail-value">{nombreProducto}</div>
            )}
          </div>

          {/* Evaluador */}
          <div className="detail-item">
            <label>Evaluador:</label>
            {isCreateMode ? (
              <div className="detail-value">
                {currentUserName || 'Usuario actual'}
                {/* Input oculto para mantener el ID del usuario en el formulario */}
                <input 
                  type="hidden" 
                  name="id_usuario" 
                  value={formData.id_usuario}
                />
              </div>
            ) : (
              <div className="detail-value">{nombreUsuario}</div>
            )}
          </div>

          {/* Tipo de Evaluación */}
          <div className="detail-item">
            <label>Tipo de Evaluación:</label>
            {isCreateMode ? (
              <select
                name="id_tipo_evaluacion"
                value={formData.id_tipo_evaluacion}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un tipo</option>
                {tiposEval.map(t => (
                  <option key={t.id} value={t.id}>{t.nombre_tipo_evaluacion}</option>
                ))}
              </select>
            ) : (
              <div className="detail-value">{nombreTipo}</div>
            )}
          </div>

          {/* Fecha */}
          <div className="detail-item">
            <label>Fecha:</label>
            <div className="detail-value">{formData.fecha_evaluacion}</div>
          </div>

          {/* Observaciones */}
          <div className="detail-item">
            <label>Observaciones:</label>
            {isCreateMode ? (
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                placeholder="Agregar observaciones..."
              />
            ) : (
              <div className="detail-value">{formData.observaciones || '—'}</div>
            )}
          </div>

          {/* Botón de guardar (solo creación) */}
          {isCreateMode && (
            <div className="detail-actions">
              <button type="submit" className="save-button">
                Crear Evaluación
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EvaluationDetail;