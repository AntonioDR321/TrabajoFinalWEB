import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import { ReactComponent as ForkKnifeIcon } from '../assets/fork-knife.svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <h1>Food Quality</h1>
          <ForkKnifeIcon className="icon" />
        </div>
        
        <h2>Recuperar contraseña</h2>
        
        {message ? (
          <div className="success-message">
            <p>{message}</p>
            <Link to="/login" className="back-to-login">Volver a iniciar sesión</Link>
          </div>
        ) : (
          <>
            <p className="instructions">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </button>
              
              <div className="back-link">
                <Link to="/login">Volver a iniciar sesión</Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;