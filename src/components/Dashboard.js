// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    completedEvaluations: 0,
    activeUsers: 0
  });
  const [recentEvaluations, setRecentEvaluations] = useState([]);

  useEffect(() => {
    const tipoEvaluacionNombre = id => {
      switch (id) {
        case 1: return 'Sensorial';
        case 2: return 'Microbiológica';
        case 3: return 'Nutricional';
        default: return 'Desconocido';
      }
    };

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };

        const [prodRes, userRes, evalsRes] = await Promise.all([
          fetch('http://localhost:4000/api/productos', { headers }),
          fetch('http://localhost:4000/api/usuarios', { headers }),
          fetch('http://localhost:4000/api/evaluaciones', { headers })
        ]);
        const [{ body: products }, { body: users }, { body: evaluations }] = await Promise.all([
          prodRes.json(), userRes.json(), evalsRes.json()
        ]);

        // Estadísticas
        setStats({
          totalProducts: products.length,
          completedEvaluations: evaluations.filter(e => e.observaciones).length,
          activeUsers: users.length
        });

        // Mapas para nombres
        const productMap = Object.fromEntries(products.map(p => [p.id, p.nombre]));
        const userMap = Object.fromEntries(users.map(u => [u.id, `${u.nombre} ${u.apellido}`]));

        // Últimas 4 evaluaciones
        const sorted = [...evaluations].sort((a, b) =>
          new Date(b.fecha_evaluacion) - new Date(a.fecha_evaluacion)
        );
        setRecentEvaluations(
          sorted.slice(0, 4).map(e => ({
            id: e.id,
            product: productMap[e.id_producto] || '—',
            date: e.fecha_evaluacion.substring(0, 10),
            status: e.observaciones ? 'Completado' : 'Pendiente',
            evaluator: userMap[e.id_usuario] || '—',
            type: tipoEvaluacionNombre(e.id_tipo_evaluacion)
          }))
        );
      } catch (err) {
        console.error('Error al cargar dashboard:', err);
      }
    };

    fetchData();
  }, []);

  const handleNuevaEvaluacion = () => {
    navigate('/evaluaciones/agregar', {
      state: { mode: 'create', from: 'dashboard' }
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>Bienvenido, {currentUser.nombre}</h1>
        <p>Panel de control del sistema de evaluación de calidad alimentaria</p>
      </div>

      {/* Estadísticas: ahora 3 tarjetas */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Productos</h3>
          <p className="stat-number">{stats.totalProducts}</p>
          <Link to="/productos" className="stat-link">Ver todos</Link>
        </div>

        <div className="stat-card">
          <h3>Evaluaciones Completadas</h3>
          <p className="stat-number">{stats.completedEvaluations}</p>
          <Link to="/evaluaciones" className="stat-link">Ver todas</Link>
        </div>

        <div className="stat-card">
          <h3>Usuarios Activos</h3>
          <p className="stat-number">{stats.activeUsers}</p>
          <Link to="/usuarios" className="stat-link">Ver todos</Link>
        </div>
      </div>

      {/* Evaluaciones recientes */}
      <div className="dashboard-recent">
        <div className="recent-header">
          <h2>Evaluaciones Recientes</h2>
          <Link to="/evaluaciones" className="view-all">Ver todas</Link>
        </div>
        <div className="recent-table">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Evaluador</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {recentEvaluations.map(ev => (
                <tr key={ev.id}>
                  <td>{ev.product}</td>
                  <td>{ev.evaluator}</td>
                  <td>{ev.type}</td>
                  <td>{ev.date}</td>
                  <td>
                    <span className={`status-badge ${ev.status.toLowerCase()}`}>{ev.status}</span>
                  </td>
                  <td>
                    <Link
                      to={`/evaluaciones/${ev.id}`}
                      state={{ from: 'dashboard', evaluationId: ev.id }}
                      className="action-link"
                    >
                      Ver detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Acciones (2 botones) */}
      <div className="dashboard-actions">
        <Link to="/productos/agregar" className="action-card">
          <h3>Añadir Producto</h3>
          <p>Registrar un nuevo producto para evaluación</p>
        </Link>
        <div
          className="action-card"
          style={{ cursor: 'pointer' }}
          onClick={handleNuevaEvaluacion}
        >
          <h3>Nueva Evaluación</h3>
          <p>Iniciar una nueva evaluación de calidad</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

