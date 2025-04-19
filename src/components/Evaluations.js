import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Evaluations.css';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
import { ReactComponent as EyeIcon } from '../assets/eye-icon.svg';

function Evaluations() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/evaluaciones', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las evaluaciones');
        }

        const data = await response.json();
        setEvaluations(data.body);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvaluations();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewEvaluation = (id) => {
    navigate(`/evaluaciones/${id}`);
  };

  const tipoEvaluacion = (id) => {
    switch (id) {
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

  const filteredEvaluations = evaluations.filter((evaluation) =>
    evaluation.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.producto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.tipo_evaluacion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="evaluations-container">
      <div className="search-filter-bar">
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar evaluaciones"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className="filter-button">Agregar filtro</button>
      </div>

      <div className="evaluations-table-container">
        <h2>Evaluaciones</h2>
        <div className="table-wrapper">
          <table className="evaluations-table">
            <thead>
              <tr>
                <th>ID Eval.</th>
                <th>Producto</th>
                <th>Evaluador</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredEvaluations.map((evaluation) => (
                <tr key={evaluation.id}>
                  <td>{evaluation.id}</td>
                  <td>{evaluation.producto}</td>
                  <td>{evaluation.usuario}</td>
                  <td>{tipoEvaluacion(evaluation.id_tipo_evaluacion)}</td>
                  <td>{evaluation.fecha_evaluacion}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => handleViewEvaluation(evaluation.id)}
                    >
                      <EyeIcon className="eye-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Evaluations;
