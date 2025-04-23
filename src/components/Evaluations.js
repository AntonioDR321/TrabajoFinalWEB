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
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Fetch en paralelo
        const [evalRes, prodRes, userRes] = await Promise.all([
          fetch('http://localhost:4000/api/evaluaciones', { headers }),
          fetch('http://localhost:4000/api/productos',    { headers }),
          fetch('http://localhost:4000/api/usuarios',     { headers })
        ]);

        if (!evalRes.ok || !prodRes.ok || !userRes.ok) {
          throw new Error('Error al obtener datos');
        }

        const [{ body: evals }, { body: prods }, { body: users }] =
          await Promise.all([evalRes.json(), prodRes.json(), userRes.json()]);

        const productById = Object.fromEntries(prods.map(p => [p.id, p]));
        const userById    = Object.fromEntries(users.map(u => [u.id, u]));

        const enriched = evals.map(e => {
          const producto = productById[e.id_producto];
          const usuario  = userById[e.id_usuario];

          return {
            ...e,
            producto: producto?.nombre || '—',
            usuario: usuario ? `${usuario.nombre} ${usuario.apellido}` : '—',
            fecha_evaluacion: e.fecha_evaluacion?.substring(0, 10) || '—'
          };
        });

        setEvaluations(enriched);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvaluations();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Aquí pasamos { from: 'list' } para que EvaluationDetail sepa que viene de la lista
  const handleViewEvaluation = (id) =>
    navigate(`/evaluaciones/${id}`, { state: { from: 'list' } });

  const tipoEvaluacion = (id) => {
    switch (id) {
      case 1: return 'Sensorial';
      case 2: return 'Microbiológica';
      case 3: return 'Nutricional';
      default: return 'Desconocido';
    }
  };

  const filteredEvaluations = evaluations.filter((evaluation) =>
    evaluation.id.toString().includes(searchTerm.toLowerCase()) ||
    evaluation.producto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tipoEvaluacion(evaluation.id_tipo_evaluacion).toLowerCase().includes(searchTerm.toLowerCase())
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
