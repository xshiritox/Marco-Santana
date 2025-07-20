<template>
  <div class="portfolio">
    <div class="container">
      <!-- Header -->
      <div class="portfolio-header">
        <h1 class="page-title">Portafolio</h1>
        <p class="page-description">
          Explora una selección de mis proyectos más recientes, donde combino 
          creatividad, tecnología y funcionalidad para crear experiencias web excepcionales.
        </p>
      </div>

      <!-- Filter Tags -->
      <div class="filter-section">
        <div class="filter-tags">
          <button 
            class="filter-tag"
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            Todos
          </button>
          <button 
            class="filter-tag"
            :class="{ active: activeFilter === 'featured' }"
            @click="setFilter('featured')"
          >
            Destacados
          </button>
          <button 
            v-for="tech in availableTechnologies" 
            :key="tech"
            class="filter-tag"
            :class="{ active: activeFilter === tech }"
            @click="setFilter(tech)"
          >
            {{ tech }}
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="projects-section">
        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>Cargando proyectos...</p>
        </div>
        
        <div v-else-if="filteredProjects.length === 0" class="empty-state">
          <div class="empty-icon">📁</div>
          <h3>No hay proyectos disponibles</h3>
          <p>Pronto habrá nuevos proyectos increíbles aquí.</p>
        </div>

        <div v-else class="projects-grid">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card"
            :class="{ featured: project.featured }"
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
                    <span class="btn-icon">🔗</span>
                    Ver Proyecto
                  </a>
                  <a 
                    v-if="project.github_url" 
                    :href="project.github_url" 
                    target="_blank"
                    class="project-btn project-btn-secondary"
                  >
                    <span class="btn-icon">💻</span>
                    GitHub
                  </a>
                </div>
              </div>
              <div v-if="project.featured" class="featured-badge">
                ⭐ Destacado
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
              <div class="project-date">
                {{ formatDate(project.created_at) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="portfolio-cta">
        <h2 class="cta-title">¿Te gusta lo que ves?</h2>
        <p class="cta-description">
          Hablemos sobre tu próximo proyecto y creemos algo increíble juntos.
        </p>
        <router-link to="/contact" class="btn btn-primary btn-large">
          Iniciar Proyecto
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { db, type Project } from '../lib/supabase'

const projects = ref<Project[]>([])
const loading = ref(true)
const activeFilter = ref('all')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value
  }
  
  if (activeFilter.value === 'featured') {
    return projects.value.filter(project => project.featured)
  }
  
  return projects.value.filter(project => 
    project.technologies.includes(activeFilter.value)
  )
})

const availableTechnologies = computed(() => {
  const techs = new Set<string>()
  projects.value.forEach(project => {
    project.technologies.forEach(tech => techs.add(tech))
  })
  return Array.from(techs).sort()
})

const setFilter = (filter: string) => {
  activeFilter.value = filter
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long'
  })
}

onMounted(async () => {
  try {
    projects.value = await db.getProjects()
  } catch (error) {
    console.error('Error loading projects:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.portfolio {
  padding: 120px 0 6rem 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.portfolio-header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  color: #FFD700;
}

.page-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #C0C0C0;
  max-width: 700px;
  margin: 0 auto;
}

/* Filters */
.filter-section {
  margin-bottom: 3rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.filter-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: #C0C0C0;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tag:hover,
.filter-tag.active {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  border-color: #FFD700;
  transform: translateY(-2px);
}

/* Loading & Empty States */
.loading {
  text-align: center;
  padding: 4rem 0;
  color: #C0C0C0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 215, 0, 0.3);
  border-top: 3px solid #FFD700;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: #C0C0C0;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #FFD700;
  margin: 0 0 1rem 0;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.project-card.featured {
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 5px 20px rgba(255, 215, 0, 0.1);
}

.project-image {
  position: relative;
  height: 240px;
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
  transform: scale(1.1);
}

.project-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.project-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #FFD700;
  color: #000;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
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

.btn-icon {
  font-size: 1rem;
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.3rem;
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
  margin-bottom: 1rem;
}

.tech-tag {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-date {
  color: #888;
  font-size: 0.9rem;
  font-style: italic;
}

/* CTA */
.portfolio-cta {
  text-align: center;
  padding: 4rem 0;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
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

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .portfolio {
    padding: 100px 0 4rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .filter-tags {
    justify-content: flex-start;
  }

  .project-actions {
    flex-direction: column;
    align-items: center;
  }

  .project-btn {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }

  .cta-title {
    font-size: 2rem;
  }
}
</style>