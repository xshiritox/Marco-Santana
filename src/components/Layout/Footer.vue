
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-section">
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="logo-text">MS</span>
            </div>
            <span class="brand-name">Marco Santana</span>
          </div>
          <p class="footer-description">
            Desarrollador web freelance especializado en crear experiencias digitales 
            excepcionales para empresas en Colombia.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h3 class="footer-title">Enlaces Rápidos</h3>
          <ul class="footer-links">
            <li><router-link to="/" class="footer-link">Inicio</router-link></li>
            <li><router-link to="/portfolio" class="footer-link">Portafolio</router-link></li>
            <li><router-link to="/about" class="footer-link">Sobre Mí</router-link></li>
            <li><router-link to="/contact" class="footer-link">Contacto</router-link></li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-section">
          <h3 class="footer-title">Servicios</h3>
          <ul class="footer-links">
            <li><span class="footer-link">Desarrollo Web</span></li>
            <li><span class="footer-link">Diseño Responsivo</span></li>
            <li><span class="footer-link">E-commerce</span></li>
            <li><span class="footer-link">SEO & Performance</span></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section">
          <h3 class="footer-title">Contacto</h3>
          <div class="contact-info">
            <p class="contact-item">
              <span class="contact-icon">📧</span>
              marco@marcosantana.dev
            </p>
            <p class="contact-item">
              <span class="contact-icon">📱</span>
              +57 300 123 4567
            </p>
            <p class="contact-item">
              <span class="contact-icon">📍</span>
              Bogotá, Colombia
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © {{ currentYear }} Marco Santana. Todos los derechos reservados.
          </p>
          <div class="footer-bottom-links">
            <span class="footer-link">Política de Privacidad</span>
            <span class="footer-link">Términos de Servicio</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: #000;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  padding: 4rem 0 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3 {
  margin: 0 0 1.5rem 0;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.footer-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.footer-logo::before {
  content: '';
  position: absolute;
  inset: 1px;
  background: #000;
  border-radius: 9px;
}

.logo-text {
  color: #FFD700;
  font-weight: 700;
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.brand-name {
  color: #FFD700;
  font-size: 1.1rem;
  font-weight: 600;
}

.footer-description {
  color: #C0C0C0;
  line-height: 1.6;
  margin: 0;
}

.footer-title {
  color: #FFD700;
  font-size: 1.1rem;
  font-weight: 600;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-link {
  color: #C0C0C0;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.footer-link:hover {
  color: #FFD700;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #C0C0C0;
  margin: 0;
}

.contact-icon {
  font-size: 1.1rem;
}

.footer-bottom {
  border-top: 1px solid rgba(192, 192, 192, 0.1);
  padding: 2rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: #C0C0C0;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-bottom-links {
    gap: 1rem;
  }
}
</style>