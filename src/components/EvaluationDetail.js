import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EvaluationDetail.css';
import { ReactComponent as BackIcon } from '../assets/back-icon.svg';

function EvaluationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [evaluationData, setEvaluationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Función para mapear el tipo de evaluación
  const tipoEvaluacionNombre = (idTipo) => {
    switch (idTipo) {
      case 1:
        return 'Sensorial';
      case 2:
        return 'Microbiológica';
      case 3:
        return 'Nutricional';
      default:
        return 'Desconocido';
    }
  };

  // Traer datos de la evaluación al cargar
  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:4000/api/evaluaciones/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Error al obtener la evaluación');
        const data = await res.json();
        setEvaluationData(data.body);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvaluation();
  }, [id]);

  const handleChange = (e) => {
    setEvaluationData({
      ...evaluationData,
      observaciones: e.target.value,
    });
  };

  const handleGoBack = () => {
    navigate('/evaluaciones');
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/evaluaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(evaluationData),
      });
      if (!res.ok) throw new Error('Error al guardar la evaluación');
      navigate('/evaluaciones');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) return <p className="loading-message">Cargando evaluación…</p>;
  if (error)   return <p className="error-message">Error: {error}</p>;
  if (!evaluationData) return <p className="error-message">Evaluación no encontrada</p>;

  return (
    <div className="evaluation-detail-container">
      <div className="evaluation-detail-card">
        <div className="detail-header">
          <button className="back-button" onClick={handleGoBack}>
            <BackIcon className="back-icon" />
            <span>Regresar</span>
          </button>
          <h2>Detalles de Evaluación</h2>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>ID Evaluación:</label>
            <div className="detail-value">{evaluationData.id}</div>
          </div>
          
          <div className="detail-item">
            <label>Producto (ID):</label>
            <div className="detail-value">{evaluationData.id_producto}</div>
          </div>
          
          <div className="detail-item">
            <label>Evaluador (ID):</label>
            <div className="detail-value">{evaluationData.id_usuario}</div>
          </div>
          
          <div className="detail-item">
            <label>Tipo:</label>
            <div className="detail-value">
              {tipoEvaluacionNombre(evaluationData.id_tipo_evaluacion)}
            </div>
          </div>
          
          <div className="detail-item">
            <label>Fecha:</label>
            <div className="detail-value">{evaluationData.fecha_evaluacion}</div>
          </div>
        </div>

        <div className="observations-section">
          <h3>Observaciones</h3>
          <textarea
            name="observaciones"
            value={evaluationData.observaciones || ''}
            onChange={handleChange}
            placeholder="Agregar observaciones..."
          />
        </div>

        <div className="detail-actions">
          <button className="save-button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EvaluationDetail;
