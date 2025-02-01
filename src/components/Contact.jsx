import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import contactIcon from '../assets/images/contact.png';
import { faPaperPlane, faMapMarkerAlt, faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    if (formData.name && formData.email && formData.message) {
      try {
        const response = await fetch("https://api.telegram.org/bot" + import.meta.env.VITE_TELEGRAM_BOT_TOKEN + "/sendMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: import.meta.env.VITE_TELEGRAM_CHANNEL_ID,
            text: `Nom: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
          }),
        });

        const data = await response.json();

        if (data.ok) {
          setStatusColor("green");
          setStatus("Message envoyé avec succès !");
          setFormData({ name: "", email: "", message: "" });
        } else {
          setStatus("Erreur lors de l'envoi du message.");
        }
      } catch (error) {
        setStatusColor("red");
        console.error("Erreur réseau :", error);
        setStatus("Erreur réseau. Veuillez réessayer plus tard.");
      }
    } else {
      setStatusColor("orange");
      setStatus("Veuillez remplir tous les champs.");
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">N'hésitez pas à me contacter pour toute opportunité, collaboration ou discussion de projet.</p>

        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-header">
              <h3 className="skills-category">
                <i><FontAwesomeIcon icon={faInfoCircle} /></i> Informations de contact
              </h3>
              <p>
                <i><FontAwesomeIcon icon={faEnvelope} /></i> contact@amarquis.fr
              </p>
              <p>
                <i><FontAwesomeIcon icon={faMapMarkerAlt} /></i> Dunkerque, France
              </p>
            </div>
            <div className="contact-footer">
              <img src={contactIcon} alt="Me contacter memoji" width="200" height="200" />
            </div>
          </div>


          <form className="contact-form" id="contact-me" onSubmit={handleSubmit}>
          {status && <p className="status-message" data-testid="status" style={{ color: statusColor }}>{status}</p>}

            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input type="text" id="name" name="name" className="form-input" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className="form-input" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" className="form-input" rows="5" required value={formData.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn">
              <i><FontAwesomeIcon icon={faPaperPlane} /></i> Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
