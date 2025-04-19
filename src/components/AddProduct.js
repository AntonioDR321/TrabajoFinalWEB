import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';
import { ReactComponent as BackIcon } from '../assets/back-icon.svg';
import { useAuth } from '../context/AuthContext';

function AddProduct() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [listas, setListas] = useState({
    subcategorias: [],
    paises: [],
    partidas: [],
    estados: []
  });

  const [productData, setProductData] = useState({
    id: 0,
    nombre: '',
    marca: '',
    id_subcategoria: '',
    id_pais: '',
    id_partida: '',
    id_estado: ''
  });

  // Obtener listas de datos para los selects
  useEffect(() => {
    const fetchListas = async () => {
      try {
        const headers = { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };
        const [subRes, paisRes, partRes, estRes] = await Promise.all([
          fetch('http://localhost:4000/api/subcategorias', { headers }),
          fetch('http://localhost:4000/api/pais', { headers }),
          fetch('http://localhost:4000/api/partidas_arancelarias', { headers }),
          fetch('http://localhost:4000/api/estado_producto', { headers })
        ]);
        const [{ body: subcategorias }, { body: paises }, { body: partidas }, { body: estados }] = await Promise.all([
          subRes.json(), paisRes.json(), partRes.json(), estRes.json()
        ]);
        setListas({ subcategorias, paises, partidas, estados });
      } catch (err) {
        console.error('Error al cargar listas:', err);
      }
    };
    fetchListas();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoBack = () => {
    navigate('/productos');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (!res.ok) throw new Error('Error al guardar producto');
      navigate('/productos');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-card" onSubmit={handleSubmit}>
        <div className="product-grid">
          <div className="product-item">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={productData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="product-item">
            <label htmlFor="marca">Marca:</label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={productData.marca}
              onChange={handleChange}
            />
          </div>

          <div className="product-item">
            <label htmlFor="id_subcategoria">Subcategoría:</label>
            <select
              id="id_subcategoria"
              name="id_subcategoria"
              value={productData.id_subcategoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              {listas.subcategorias.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>

          <div className="product-item">
            <label htmlFor="id_pais">País:</label>
            <select
              id="id_pais"
              name="id_pais"
              value={productData.id_pais}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              {listas.paises.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div className="product-item">
            <label htmlFor="id_partida">Partida arancelaria:</label>
            <select
              id="id_partida"
              name="id_partida"
              value={productData.id_partida}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              {listas.partidas.map(pa => (
                <option key={pa.id} value={pa.id}>{pa.numero_partida}</option>
              ))}
            </select>
          </div>

          <div className="product-item">
            <label htmlFor="id_estado">Estado:</label>
            <select
              id="id_estado"
              name="id_estado"
              value={productData.id_estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              {listas.estados.map(es => (
                <option key={es.id} value={es.id}>{es.nombre_estado}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="product-actions">
          <button type="button" className="back-button" onClick={handleGoBack}>
            <BackIcon className="back-icon" />
            <span>Regresar</span>
          </button>

          <button type="submit" className="done-button">
            Hecho
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
