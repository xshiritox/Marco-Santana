<template>
  <div class="about">
    <div class="container">
      <!-- Hero Section -->
      <section class="about-hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="page-title">Sobre Mí</h1>
            <h2 class="hero-subtitle" v-if="personalInfo">{{ personalInfo.title }}</h2>
            <p class="hero-description" v-if="personalInfo">
              {{ personalInfo.bio }}
            </p>
            <div class="hero-cta">
              <router-link to="/contact" class="btn btn-primary">
                Trabajemos Juntos
              </router-link>
              <a 
                v-if="personalInfo?.resume_url" 
                :href="personalInfo.resume_url" 
                target="_blank"
                class="btn btn-secondary"
              >
                Descargar CV
              </a>
            </div>
          </div>
          <div class="hero-image">
            <div class="image-container">
              <img 
                v-if="personalInfo?.avatar_url" 
                :src="personalInfo.avatar_url" 
                :alt="personalInfo.name"
                class="profile-image"
              />
              <div v-else class="profile-placeholder">
                <span class="placeholder-text">{{ getInitials(personalInfo?.name) }}</span>
              </div>
              <div class="image-decoration"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="skills-section">
        <h2 class="section-title">Tecnologías & Herramientas</h2>
        <div class="skills-grid">
          <div class="skill-category">
            <h3 class="category-title">Frontend</h3>
            <div class="skills-list">
              <div class="skill-item">
                <span class="skill-icon">⚡</span>
                <span class="skill-name">Vue.js</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">⚛️</span>
                <span class="skill-name">React</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">🅰️</span>
                <span class="skill-name">Angular</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">🎨</span>
                <span class="skill-name">Tailwind CSS</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">📱</span>
                <span class="skill-name">React Native</span>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h3 class="category-title">Backend</h3>
            <div class="skills-list">
              <div class="skill-item">
                <span class="skill-icon">🟢</span>
                <span class="skill-name">Node.js</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">🐍</span>
                <span class="skill-name">Python</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">📊</span>
                <span class="skill-name">PostgreSQL</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">🍃</span>
                <span class="skill-name">MongoDB</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">🔥</span>
                <span class="skill-name">Firebase</span>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h3 class="category-title">DevOps & Tools</h3>
            <div class="skills-list">
              <div class="skill-item">
                <span class="skill-icon">🐳</span>
                <span class="skill-name">Docker</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">☁️</span>
                <span class="skill-name">AWS</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">🌐</span>
                <span class="skill-name">Netlify</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">📝</span>
                <span class="skill-name">Git</span>
              </div>
              <div class="skill-item">
                <span class="skill-icon">🔧</span>
                <span class="skill-name">Vite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="experience-section">
        <h2 class="section-title">Mi Proceso de Trabajo</h2>
        <div class="process-steps">
          <div class="process-step">
            <div class="step-number">01</div>
            <div class="step-content">
              <h3 class="step-title">Análisis & Planificación</h3>
              <p class="step-description">
                Entiendo las necesidades de tu negocio y defino la estrategia 
                técnica más efectiva para alcanzar tus objetivos.
              </p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">02</div>
            <div class="step-content">
              <h3 class="step-title">Diseño & Prototipado</h3>
              <p class="step-description">
                Creo wireframes y prototipos funcionales que garantizan 
                una experiencia de usuario excepcional.
              </p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">03</div>
            <div class="step-content">
              <h3 class="step-title">Desarrollo</h3>
              <p class="step-description">
                Desarrollo tu proyecto utilizando las mejores prácticas 
                y las tecnologías más modernas del mercado.
              </p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">04</div>
            <div class="step-content">
              <h3 class="step-title">Testing & Optimización</h3>
              <p class="step-description">
                Pruebo exhaustivamente el proyecto y optimizo el rendimiento 
                para garantizar la mejor experiencia posible.
              </p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">05</div>
            <div class="step-content">
              <h3 class="step-title">Lanzamiento & Soporte</h3>
              <p class="step-description">
                Lanzo tu proyecto y proporciono soporte continuo para 
                asegurar su funcionamiento óptimo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="values-section">
        <h2 class="section-title">Mis Valores</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">🎯</div>
            <h3 class="value-title">Orientado a Resultados</h3>
            <p class="value-description">
              Cada proyecto está diseñado para cumplir objetivos específicos 
              y generar valor real para tu negocio.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">💡</div>
            <h3 class="value-title">Innovación Constante</h3>
            <p class="value-description">
              Me mantengo actualizado con las últimas tecnologías para 
              ofrecer soluciones modernas y eficientes.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">🤝</div>
            <h3 class="value-title">Comunicación Transparente</h3>
            <p class="value-description">
              Mantengo una comunicación clara y constante durante todo 
              el proceso de desarrollo del proyecto.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">⚡</div>
            <h3 class="value-title">Calidad & Rendimiento</h3>
            <p class="value-description">
              Desarrollo código limpio, escalable y optimizado que 
              garantiza el mejor rendimiento posible.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="about-cta">
        <div class="cta-content">
          <h2 class="cta-title">¿Hablamos de tu proyecto?</h2>
          <p class="cta-description">
            Estoy siempre disponible para nuevos desafíos y oportunidades 
            de colaboración. ¡Contactame y hagamos realidad tu visión!
          </p>
          <div class="cta-actions">
            <router-link to="/contact" class="btn btn-primary btn-large">
              Iniciar Conversación
            </router-link>
            <router-link to="/portfolio" class="btn btn-secondary">
              Ver Mis Trabajos
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db, type PersonalInfo } from '../lib/supabase'

const personalInfo = ref<PersonalInfo | null>(null)
const loading = ref(true)

const getInitials = (name?: string) => {
  if (!name) return 'MS'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

onMounted(async () => {
  try {
    personalInfo.value = await db.getPersonalInfo()
  } catch (error) {
    console.error('Error loading personal info:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.about {
  padding: 120px 0 6rem 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.about-hero {
  margin-bottom: 6rem;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #FFD700;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  color: #C0C0C0;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #C0C0C0;
  margin: 0 0 2.5rem 0;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-image {
  display: flex;
  justify-content: center;
}

.image-container {
  position: relative;
  width: 300px;
  height: 300px;
}

.profile-image,
.profile-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.profile-placeholder {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 4rem;
  font-weight: 700;
  color: #000;
}

.image-decoration {
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1));
  border-radius: 20px;
  z-index: 1;
}

/* Common Styles */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 3rem 0;
  color: #FFD700;
}

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

/* Skills Section */
.skills-section {
  margin-bottom: 6rem;
  padding: 4rem 0;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.skill-category {
  text-align: center;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  color: #FFD700;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.skill-item:hover {
  border-color: rgba(255, 215, 0, 0.3);
  transform: translateX(5px);
}

.skill-icon {
  font-size: 1.5rem;
}

.skill-name {
  color: #C0C0C0;
  font-weight: 500;
}

/* Experience Section */
.experience-section {
  margin-bottom: 6rem;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.process-step {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.process-step:hover {
  border-color: rgba(255, 215, 0, 0.3);
  transform: translateY(-2px);
}

.step-number {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #FFD700;
}

.step-description {
  color: #C0C0C0;
  line-height: 1.6;
  margin: 0;
}

/* Values Section */
.values-section {
  margin-bottom: 6rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.value-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.value-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #FFD700;
}

.value-description {
  color: #C0C0C0;
  line-height: 1.6;
  margin: 0;
}

/* CTA Section */
.about-cta {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.05));
  border-radius: 20px;
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

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .about {
    padding: 100px 0 4rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-image {
    order: -1;
  }

  .image-container {
    width: 250px;
    height: 250px;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .hero-cta,
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .process-step {
    flex-direction: column;
    text-align: center;
  }

  .step-number {
    align-self: center;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .cta-title {
    font-size: 2rem;
  }
}
</style>