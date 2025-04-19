import React from 'react';
import './About.css';
import forkKnife from '../assets/fork-knife.svg';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <img src={forkKnife} alt="Fork and Knife Icon" className="about-icon" />
        <h2>Sobre Nosotros</h2>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h3>Nuestra Misión</h3>
          <p>
            En Food Quality, nos dedicamos a revolucionar la gestión de la seguridad alimentaria 
            a través de soluciones tecnológicas innovadoras. Nuestro software de gestión de 
            riesgos alimentarios está diseñado para ayudar a las empresas a mantener los más 
            altos estándares de calidad y seguridad en sus productos.
          </p>
        </section>

        <section className="about-section">
          <h3>¿Qué Hacemos?</h3>
          <p>
            Proporcionamos una plataforma integral que permite:
          </p>
          <ul>
            <li>Evaluación detallada de riesgos alimentarios</li>
            <li>Monitoreo en tiempo real de puntos críticos de control</li>
            <li>Gestión de certificaciones de calidad</li>
            <li>Trazabilidad completa de productos alimenticios</li>
            <li>Generación de informes y análisis de datos</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Nuestro Compromiso</h3>
          <p>
            Nos comprometemos a ser su aliado en la garantía de la seguridad alimentaria, 
            ofreciendo herramientas avanzadas y soporte experto para mantener sus procesos 
            alineados con los estándares internacionales y las mejores prácticas de la industria.
          </p>
        </section>

        <section className="about-section">
          <h3>¿Por Qué Elegirnos?</h3>
          <div className="features-grid">
            <div className="feature-item">
              <h4>Experiencia</h4>
              <p>Años de experiencia en seguridad alimentaria y desarrollo de software.</p>
            </div>
            <div className="feature-item">
              <h4>Innovación</h4>
              <p>Tecnología de vanguardia para la gestión de riesgos alimentarios.</p>
            </div>
            <div className="feature-item">
              <h4>Soporte</h4>
              <p>Asistencia técnica continua y capacitación personalizada.</p>
            </div>
            <div className="feature-item">
              <h4>Cumplimiento</h4>
              <p>Alineación con normativas internacionales de seguridad alimentaria.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;