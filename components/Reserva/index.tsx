'use client';

import { useState } from 'react';

export default function Reserva() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    event: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `¡Hola! Me gustaría hacer una reserva.\n\n`;
    message += `Nombre: ${formData.name || 'No proporcionado'}\n`;
    message += `Teléfono: ${formData.phone || 'No proporcionado'}\n`;
    message += `Fecha: ${formData.date || 'No proporcionada'}\n`;
    message += `Hora: ${formData.time || 'No proporcionada'}\n`;
    message += `Personas: ${formData.guests || 'No proporcionado'}\n`;
    message += `Tipo de evento: ${formData.event || 'No proporcionado'}\n`;

    if (formData.message) {
      message += `\nMensaje adicional: ${formData.message}`;
    }

    const whatsappUrl = `https://wa.me/573101234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="reserva" className="reserva">
      <div className="container">
        <div className="reserva-grid">
          <div className="reserva-info">
            <h2>Reserva tu experiencia</h2>

            <div className="reserva-contact">
              <div className="reserva-contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+57 310 123 4567</span>
              </div>
              <div className="reserva-contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>reservas@salariodezipa.com</span>
              </div>
              <div className="reserva-contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Lun - Dom: 11:00 a.m. - 10:00 p.m.</span>
              </div>
            </div>

            <div className="reserva-reviews">
              <div className="review-header">
                <span className="review-stars">★★★★★</span>
                <span className="review-source">Google Reviews</span>
              </div>
              <p className="review-text">
                "Una experiencia inolvidable. La atmósfera es única y la comida excepcional.
                Definitivamente el mejor restaurante de Zipaquirá."
              </p>
            </div>
          </div>

          <div className="reserva-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="date">Fecha</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-input"
                    required
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="time">Hora</label>
                  <select
                    id="time"
                    name="time"
                    className="form-select"
                    required
                    value={formData.time}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="guests">Número de Personas</label>
                  <select
                    id="guests"
                    name="guests"
                    className="form-select"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="1-2">1-2 personas</option>
                    <option value="3-4">3-4 personas</option>
                    <option value="5-6">5-6 personas</option>
                    <option value="7-10">7-10 personas</option>
                    <option value="10-20">10-20 personas</option>
                    <option value="20+">Más de 20</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="event">Tipo de Evento</label>
                  <select
                    id="event"
                    name="event"
                    className="form-select"
                    value={formData.event}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="cena">Cena particular</option>
                    <option value="celebracion">Celebración especial</option>
                    <option value="empresa">Evento corporativo</option>
                    <option value="boda">Matrimonio</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="form-group full-width">
                <label className="form-label" htmlFor="message">Mensaje Adicional</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Cuéntanos más detalles sobre tu reserva..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="form-submit">Enviar por WhatsApp</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}