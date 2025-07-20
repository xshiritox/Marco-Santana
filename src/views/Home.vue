<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            Desarrollador Web
            <span class="hero-highlight">Freelance</span>
            en Colombia
          </h1>
          <p class="hero-description">
            Creo experiencias digitales excepcionales que impulsan el crecimiento 
            de tu negocio. Especializado en desarrollo web moderno, responsivo y optimizado.
          </p>
          <div class="hero-cta">
            <router-link to="/portfolio" class="btn btn-primary">
              Ver Portafolio
            </router-link>
            <router-link to="/contact" class="btn btn-secondary">
              Contactar Ahora
            </router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-card">
            <div class="card-content">
              <div class="code-snippet">
                <div class="code-line">
                  <span class="code-keyword">const</span>
                  <span class="code-variable">developer</span>
                  <span class="code-operator">=</span>
                  <span class="code-string">"Marco Santana"</span>
                </div>
                <div class="code-line">
                  <span class="code-keyword">const</span>
                  <span class="code-variable">skills</span>
                  <span class="code-operator">=</span>
                  <span class="code-bracket">[</span>
                </div>
                <div class="code-line code-indent">
                  <span class="code-string">"Vue.js"</span>,
                  <span class="code-string">"React"</span>,
                </div>
                <div class="code-line code-indent">
                  <span class="code-string">"Node.js"</span>,
                  <span class="code-string">"TypeScript"</span>
                </div>
                <div class="code-line">
                  <span class="code-bracket">]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <div class="container">
        <h2 class="section-title">Servicios Especializados</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🌐</div>
            <h3 class="service-title">Desarrollo Web</h3>
            <p class="service-description">
              Sitios web modernos y responsivos utilizando las últimas tecnologías 
              como Vue.js, React y Node.js.
            </p>
          </div>
          <div class="service-card">
            <div class="service-icon">🛒</div>
            <h3 class="service-title">E-commerce</h3>
            <p class="service-description">
              Tiendas online completas con pasarelas de pago, gestión de inventario 
              y paneles administrativos.
            </p>
          </div>
          <div class="service-card">
            <div class="service-icon">📱</div>
            <h3 class="service-title">Diseño Responsivo</h3>
            <p class="service-description">
              Interfaces que se adaptan perfectamente a cualquier dispositivo, 
              garantizando la mejor experiencia de usuario.
            </p>
          </div>
          <div class="service-card">
            <div class="service-icon">⚡</div>
            <h3 class="service-title">Optimización</h3>
            <p class="service-description">
              SEO técnico y optimización de rendimiento para mejorar la velocidad 
              y posicionamiento en buscadores.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="featured-projects">
      <div class="container">
        <h2 class="section-title">Proyectos Destacados</h2>
        <div class="projects-grid" v-if="featuredProjects.length > 0">
          <div 
            v-for="project in featuredProjects" 
            :key="project.id"
            class="project-card"
          >
            <div class="project-image">
              <img :src="project.image_url" :alt="project.title" />
              <div class="project-overlay">
                <div class="project-actions">
                  <a 
                    v-if="project.project_url" 
                    :href="project.project_url" 
                    target="_blank"
                    class="project-btn"
                  >
                    Ver Proyecto
                  </a>
                  <a 
                    v-if="project.github_url" 
                    :href="project.github_url" 
                    target="_blank"
                    class="project-btn project-btn-secondary"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-technologies">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="featured-cta">
          <router-link to="/portfolio" class="btn btn-primary">
            Ver Todos los Proyectos
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">¿Listo para llevar tu proyecto al siguiente nivel?</h2>
          <p class="cta-description">
            Trabajemos juntos para crear la solución web perfecta para tu negocio.
          </p>
          <router-link to="/contact" class="btn btn-primary btn-large">
            Comenzar Proyecto
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db, type Project } from '../lib/supabase'

const featuredProjects = ref<Project[]>([])

onMounted(async () => {
  try {
    featuredProjects.value = await db.getFeaturedProjects()
  } catch (error) {
    console.error('Error loading featured projects:', error)
  }
})
</script>

<style scoped>
.home {
  padding-top: 80px;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.05) 0%, transparent 70%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(192, 192, 192, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1.5rem 0;
  color: #fff;
}

.hero-highlight {
  color: #FFD700;
  display: block;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #C0C0C0;
  margin: 0 0 2.5rem 0;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.floating-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.card-content {
  font-family: 'Courier New', monospace;
}

.code-snippet {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.code-line {
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-indent {
  padding-left: 1rem;
}

.code-keyword { color: #FF6B6B; }
.code-variable { color: #4ECDC4; }
.code-operator { color: #FFD700; }
.code-string { color: #95E1D3; }
.code-bracket { color: #C0C0C0; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #FFD700;
  border: 2px solid #FFD700;
}

.btn-secondary:hover {
  background: #FFD700;
  color: #000;
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
}

/* Common */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 3rem 0;
  color: #FFD700;
}

/* Services Section */
.services {
  padding: 6rem 0;
  background: rgba(255, 255, 255, 0.02);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.service-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #FFD700;
}

.service-description {
  color: #C0C0C0;
  line-height: 1.6;
  margin: 0;
}

/* Featured Projects */
.featured-projects {
  padding: 6rem 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 215, 0, 0.3);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.project-btn {
  padding: 0.75rem 1.5rem;
  background: #FFD700;
  color: #000;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.project-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.project-btn-secondary {
  background: transparent;
  color: #FFD700;
  border: 2px solid #FFD700;
}

.project-btn-secondary:hover {
  background: #FFD700;
  color: #000;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #FFD700;
}

.project-description {
  color: #C0C0C0;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.featured-cta {
  text-align: center;
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: rgba(255, 255, 255, 0.02);
  text-align: center;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 30px;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #FFD700;
}

.cta-description {
  font-size: 1.25rem;
  color: #C0C0C0;
  margin: 0 0 2.5rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-visual {
    order: -1;
  }

  .floating-card {
    max-width: 300px;
  }

  .hero-cta {
    justify-content: center;
  }

  .btn {
    width: 100%;
    max-width: 250px;
  }

  .section-title {
    font-size: 2rem;
  }

  .cta-title {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>