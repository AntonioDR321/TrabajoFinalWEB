import React, { useState, useEffect } from 'react';
import './History.css';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';

function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [historyLogs, setHistoryLogs] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/historial_acciones', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el historial');
        }

        const data = await response.json();
        setHistoryLogs(data.body);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLogs = historyLogs.filter(
    (log) =>
      log.usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.accion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="history-container">
      <div className="search-filter-bar">
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar en historial"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className="filter-button">Agregar filtro</button>
      </div>

      <div className="history-table-container">
        <h2>Historial</h2>
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.usuario}</td>
                  <td>{log.fecha}</td>
                  <td>{log.accion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
