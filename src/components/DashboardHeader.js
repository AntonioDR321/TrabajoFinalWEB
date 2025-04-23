import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DashboardHeader.css';
import { ReactComponent as ForkKnifeIcon } from '../assets/fork-knife.svg';
import { ReactComponent as UserIcon } from '../assets/user-icon.svg';

function DashboardHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  
  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Handle logout and redirect to landing page
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // If no user is logged in, redirect to login
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <header className="dashboard-header">
      <div className="container">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <h1>Food Quality</h1>
          <ForkKnifeIcon className="icon" />
        </div>
        <nav>
          <ul>
            <li><Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Inicio</Link></li>
            <li><Link to="/productos" className={isActive('/productos') ? 'active' : ''}>Productos</Link></li>
            <li><Link to="/evaluaciones" className={isActive('/evaluaciones') ? 'active' : ''}>Evaluaciones</Link></li>
            <li><Link to="/usuarios" className={isActive('/usuarios') ? 'active' : ''}>Usuarios</Link></li>
          </ul>
        </nav>
        <div className="user-profile">
          <Link to="/profile">
            <UserIcon className="user-icon" />
          </Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
