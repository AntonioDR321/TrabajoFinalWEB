import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { ReactComponent as ForkKnifeIcon } from '../assets/fork-knife.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter-icon.svg';
import { ReactComponent as InstagramIcon } from '../assets/instagram-icon.svg';
import { ReactComponent as FacebookIcon } from '../assets/facebook-icon.svg';
import { ReactComponent as LinkedInIcon } from '../assets/linkedin-icon.svg';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">
              <h2>Food Quality</h2>
              <ForkKnifeIcon className="icon" />
            </Link>
            <p>Sistema de Evaluación de Calidad Alimentaria</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h3>Enlaces</h3>
              <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/about">Acerca de</Link></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h3>Legal</h3>
              <ul>
                <li><Link to="/terms">Términos de uso</Link></li>
                <li><Link to="/privacy">Política de privacidad</Link></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h3>Contacto</h3>
              <ul>
                <li><a href="tel:+34912345678">+34 912 345 678</a></li>
              </ul>
              <div className="social-links">
                <a href="https://twitter.com/foodquality" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon className="social-icon" />
                </a>
                <a href="https://instagram.com/foodquality" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="social-icon" />
                </a>
                <a href="https://facebook.com/foodquality" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon className="social-icon" />
                </a>
                <a href="https://linkedin.com/company/foodquality" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Food Quality. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;