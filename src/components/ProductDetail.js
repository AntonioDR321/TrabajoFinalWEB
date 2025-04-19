import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:4000/api/productos/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProduct(data.body);
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDone = () => {
    navigate('/productos');
  };

  if (!product) {
    return <div className="product-detail-container">Cargando producto...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="detail-grid">
          <div className="detail-item">
            <label>Código:</label>
            <div className="detail-value">{product.codigo}</div>
          </div>

          <div className="detail-item">
            <label>Estado:</label>
            <div className="detail-value">{product.estado || 'Activo'}</div>
          </div>

          <div className="detail-item">
            <label>Producto:</label>
            <div className="detail-value">{product.nombre}</div>
          </div>

          <div className="detail-item">
            <label>Última evaluación:</label>
            <div className="detail-value">{product.fecha}</div>
          </div>

          <div className="detail-item">
            <label>Categoría:</label>
            <div className="detail-value">{product.categoria}</div>
          </div>

          <div className="detail-item">
            <label>Código arancelario:</label>
            <div className="detail-value">{product.codigo_arancelario}</div>
          </div>

          <div className="detail-item">
            <label>País:</label>
            <div className="detail-value">{product.pais}</div>
          </div>

          <div className="detail-item">
            <label>Riesgo:</label>
            <div className="detail-value risk-value">{product.riesgo}</div>
          </div>
        </div>

        <div className="detail-actions">
          <button className="done-button" onClick={handleDone}>
            Hecho
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
