import React, { useState, useEffect } from 'react';
import meIcon from '../assets/images/me_icon.png';

const Navbar = () => {
    // État pour gérer l'ouverture/fermeture du menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Fonction pour ouvrir/fermer le menu burger
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    // Fonction pour fermer le menu lorsque l'utilisateur clique sur un lien
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    
    // Gestion du clic à l'extérieur pour fermer le menu
    useEffect(() => {
        const handleClickOutside = (e) => {
            const burgerMenu = document.querySelector('.burger-menu');
            const navLinks = document.querySelector('.nav-links');
            const navLinksItems = document.querySelectorAll('.nav-link');
            
            // Toggle menu on burger click
            burgerMenu.addEventListener('click', () => {
                burgerMenu.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            navLinksItems.forEach(link => {
                link.addEventListener('click', () => {
                    burgerMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
                    burgerMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
            
            if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
                setIsMenuOpen(false); // Ferme le menu
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        
        // Nettoyage de l'événement lorsqu'on quitte le composant
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    
    return (
    <nav>
        <div className="container nav-container">
            <a href="#" className="logo">
                <img src={meIcon} alt="Alexis MARQUIS" />
            </a>
            <div className="burger-menu" onClick={toggleMenu}>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
            </div>
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <a href="#about" className="nav-link" onClick={closeMenu}>À propos</a>
                <a href="#skills" className="nav-link" onClick={closeMenu}>Compétences</a>
                <a href="#projects" className="nav-link" onClick={closeMenu}>Projets</a>
                <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;
