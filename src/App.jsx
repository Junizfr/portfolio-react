import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Typed from "typed.js";
import { gsap } from "gsap";
import './App.css'
import meImg from './assets/images/me.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

function App() {
  const typedElement = useRef(null); // Reference to the DOM element for typed.js
  useEffect(() => {
    const typed = new Typed("#typed-text", {
      strings: [
        "Développeur Fullstack",
        "Passionné par le Web",
        "En constante évolution",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    })

    return () => {
      typed.destroy()
    }

    gsap.from(".animate", { opacity: 0, y: 50, duration: 1, stagger: 0.3 });
  }, []);

  useEffect(() => {
    const cercle = document.getElementById('cercle');
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    let rafId = null;

    const handleMouseMove = (event) => {
        mouseX = event.pageX;
        mouseY = event.pageY;
    };

    const updateCirclePosition = () => {
        posX += (mouseX - posX) * 0.15; // Accélération plus douce
        posY += (mouseY - posY) * 0.15;

        const rect = cercle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 + window.scrollX;
        const centerY = rect.top + rect.height / 2 + window.scrollY;

        const angle = Math.atan2(posY - centerY, posX - centerX) * (180 / Math.PI);

        cercle.style.left = `${posX}px`;
        cercle.style.top = `${posY}px`;
        cercle.style.setProperty('--rotation', `${angle}deg`);

        rafId = requestAnimationFrame(updateCirclePosition);
    };

    document.addEventListener('mousemove', handleMouseMove);
    updateCirclePosition(); // Lancer l'animation en continu

    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(rafId);
    };
}, []);

  return (
    <div>
      <Navbar />
      <section className="hero" id="about">
        <div className="container">
            <div className="hero-container">
                <div className="hero-image-container">
                    <div className="hero-image-bg"></div>
                    <img src={meImg} alt="Alexis MARQUIS" className="hero-image" />
                </div>
                <div className="hero-content">
                    <span className="hero-badge">
                        <i className="fas fa-code"></i> Développeur Web Junior
                    </span>
                    <h1>Alexis<br />MARQUIS</h1>
                    <div className="hero-flex">
                        <p className="hero-subtitle" id="typed-text" ref={typedElement}></p>
                    </div>
                    <p className="hero-description">
                        Bonjour ! Je suis développeur web junior basé à Dunkerque. 
                        Actuellement en formation, je me spécialise dans la création 
                        d'applications web modernes et intuitives. Passionné par le 
                        développement fullstack et le design d'interface, je cherche 
                        constamment à améliorer mes compétences et à relever de 
                        nouveaux défis.
                    </p>
                    <div className="hero-buttons">
                        <a href="#contact" className="btn">
                            <i className="fas fa-paper-plane"></i>
                            Me contacter
                        </a>
                        <a href="#projects" className="btn btn-outline">
                            <i className="fas fa-eye"></i>
                            Voir mes projets
                        </a>
                    </div>
                    <div className="social-links">
                        <a href="https://github.com/Junizfr" className="social-link" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="https://www.linkedin.com/in/alexismarquis/" className="social-link" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href="https://x.com/Juniz_FR" className="social-link" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
      <Skills />
      <Projects />
      <Contact />

      <footer>
        <div className="container">
            <div className="footer-content">
                <div className="footer-bottom">
                    <p>&copy; 2025 Alexis MARQUIS. Tous droits réservés.</p>
                </div>
            </div>
        </div>
    </footer>

    </div>
  );
}

export default App;