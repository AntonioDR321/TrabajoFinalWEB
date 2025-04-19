import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
import { ReactComponent as EyeIcon } from '../assets/eye-icon.svg';
import { ReactComponent as AddIcon } from '../assets/add-icon.svg';

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fecha aleatoria entre 1/1/2020 y hoy
  const randomPastDate = () => {
    const start = new Date(2020, 0, 1).getTime();
    const end   = Date.now();
    return new Date(start + Math.random() * (end - start))
      .toLocaleDateString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Pido productos, subcategorias y categorias en paralelo
        const [prodRes, subRes, catRes] = await Promise.all([
          fetch('http://localhost:4000/api/productos',   { headers }),
          fetch('http://localhost:4000/api/subcategorias',{ headers }),
          fetch('http://localhost:4000/api/categorias',   { headers }),
        ]);

        if (!prodRes.ok || !subRes.ok || !catRes.ok) {
          throw new Error('Error al obtener datos del servidor');
        }

        const [{ body: rawProducts }, { body: rawSubs }, { body: rawCats }] =
          await Promise.all([prodRes.json(), subRes.json(), catRes.json()]);

        // Creo dos mapas para lookup rápido
        const subById = Object.fromEntries(rawSubs.map(s => [s.id, s]));
        const catById = Object.fromEntries(rawCats.map(c => [c.id, c]));

        // Enriquecer cada producto
        const enriched = rawProducts.map(p => {
          // subcategoría
          const sub = subById[p.id_subcategoria] || {};
          // categoría padre
          const cat = catById[sub.id_categoria] || {};
          return {
            ...p,
            codigo:     p.id,                         // usamos el id como código
            categoria:  cat.nombre   || '—',          // nombre de la categoría
            riesgo:     sub.nivel_riesgo || '—',      // nivel de riesgo
            fecha:      randomPastDate()              // fecha random
          };
        });

        setProducts(enriched);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSearch    = e => setSearchTerm(e.target.value);
  const handleView      = id => navigate(`/productos/${id}`);
  const handleAddProduct= () => navigate('/productos/agregar');

  const filtered = products.filter(prod =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <div className="search-filter-bar">
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar producto"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className="filter-button">Agregar filtro</button>
      </div>

      <div className="products-table-container">
        <div className="products-header">
          <h2>Productos</h2>
          <button className="add-product-button" onClick={handleAddProduct}>
            <AddIcon className="add-icon" />
          </button>
        </div>
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Código</th>
                <th>Categoría</th>
                <th>Riesgo</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(prod => (
                <tr key={prod.id}>
                  <td>{prod.nombre}</td>
                  <td>{prod.codigo}</td>
                  <td>{prod.categoria}</td>
                  <td className={`risk-cell ${prod.riesgo.toLowerCase()}`}>
                    {prod.riesgo}
                  </td>
                  <td>{prod.fecha}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => handleView(prod.id)}
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

export default Products;
