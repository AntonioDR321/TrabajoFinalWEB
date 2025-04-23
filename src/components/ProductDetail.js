import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../assets/back-icon.svg';
import './ProductDetail.css';

function ProductDetail() {
  console.log("Renderizando ProductDetail"); // Depuración
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("ID del producto:", id); // Depuración
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchProductDetails = async () => {
      console.log("Iniciando fetch de detalles del producto"); // Depuración
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Primer paso: intentar obtener solo el producto para ver si funciona
        const prodRes = await fetch(`http://localhost:4000/api/productos/${id}`, { headers });
        
        if (!prodRes.ok) {
          throw new Error(`Error en la respuesta: ${prodRes.status}`);
        }
        
        const prodData = await prodRes.json();
        console.log("Respuesta de la API productos:", prodData); // Depuración
        
        // Aseguramos que rawProduct es un objeto (no un array)
        const productData = Array.isArray(prodData.body) ? prodData.body[0] : prodData.body;
        
        if (!productData) {
          throw new Error('Producto no encontrado');
        }
        
        // Ahora obtenemos las subcategorías y categorías
        const [subRes, catRes] = await Promise.all([
          fetch('http://localhost:4000/api/subcategorias', { headers }),
          fetch('http://localhost:4000/api/categorias', { headers }),
        ]);

        if (!subRes.ok || !catRes.ok) {
          throw new Error('Error al obtener datos complementarios');
        }

        const [{ body: subcategorias }, { body: categorias }] = 
          await Promise.all([subRes.json(), catRes.json()]);
          
        console.log("Subcategorías:", subcategorias); // Depuración
        console.log("Categorías:", categorias); // Depuración

        // Creamos mapas para búsqueda rápida
        const subById = Object.fromEntries(subcategorias.map(s => [s.id, s]));
        const catById = Object.fromEntries(categorias.map(c => [c.id, c]));

        // Obtenemos información de subcategoría y categoría
        const subcategoria = subById[productData.id_subcategoria] || {};
        const categoria = catById[subcategoria.id_categoria] || {};

        // Enriquecemos el producto con información adicional
        const enrichedProduct = {
          ...productData,
          codigo: productData.id, // Usamos ID como código
          categoria: categoria.nombre || '—',
          subcategoria: subcategoria.nombre || '—',
          riesgo: subcategoria.nivel_riesgo || '—',
          fecha: new Date().toLocaleDateString(), // Fecha actual para demostración
          codigo_arancelario: productData.codigo_arancelario || '—',
          pais: productData.pais || 'No especificado',
          estado: productData.activo ? 'Activo' : 'Inactivo'
        };

        console.log("Producto enriquecido:", enrichedProduct); // Depuración
        setProduct(enrichedProduct);
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleDone = () => {
    navigate('/productos');
  };

  // Para verificar visualmente que el componente está funcionando
  console.log("Estado actual:", { loading, product, error });

  if (loading) {
    return (
      <div className="product-detail-container" style={{padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "200px"}}>
        <div style={{textAlign: "center", padding: "2rem"}}>
          <h2>Cargando detalles del producto...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container" style={{padding: "2rem", backgroundColor: "#ffebee", minHeight: "200px"}}>
        <div style={{textAlign: "center", padding: "2rem"}}>
          <h2>Error al cargar el producto</h2>
          <p>{error}</p>
          <button className="done-button" onClick={handleDone}>Volver a Productos</button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container" style={{padding: "2rem", backgroundColor: "#e8eaf6", minHeight: "200px"}}>
        <div style={{textAlign: "center", padding: "2rem"}}>
          <h2>Producto no encontrado</h2>
          <button className="done-button" onClick={handleDone}>Volver a Productos</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="detail-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button className="back-button" onClick={handleDone}>
            <BackIcon className="back-icon" /><span>Regresar</span>
          </button>
          <h2 style={{ margin: '0 auto', fontSize: '1.5rem' }}>Detalle del Producto</h2>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>Código:</label>
            <div className="detail-value">{product.codigo}</div>
          </div>

          <div className="detail-item">
            <label>Estado:</label>
            <div className="detail-value">{product.estado}</div>
          </div>

          <div className="detail-item">
            <label>Nombre:</label>
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
            <label>Subcategoría:</label>
            <div className="detail-value">{product.subcategoria}</div>
          </div>

          <div className="detail-item">
            <label>Código arancelario:</label>
            <div className="detail-value">{product.codigo_arancelario || '—'}</div>
          </div>

          <div className="detail-item">
            <label>País de origen:</label>
            <div className="detail-value">{product.pais}</div>
          </div>

          <div className="detail-item">
            <label>Nivel de riesgo:</label>
            <div className="detail-value risk-value">{product.riesgo}</div>
          </div>

          <div className="detail-item">
            <label>Descripción:</label>
            <div className="detail-value">{product.descripcion || 'Sin descripción'}</div>
          </div>
        </div>

        <div className="detail-actions">
          <div></div>
          <button className="done-button" onClick={handleDone}>
            Hecho
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;