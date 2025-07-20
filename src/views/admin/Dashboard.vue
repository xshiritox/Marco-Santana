<template>
  <div class="admin-dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-container">
        <div class="header-left">
          <div class="logo">
            <span class="logo-text">MS</span>
          </div>
          <h1 class="dashboard-title">Panel de Administración</h1>
        </div>
        <div class="header-right">
          <span class="user-email" v-if="user">{{ user.email }}</span>
          <button @click="handleLogout" class="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="dashboard-nav">
      <div class="nav-container">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="nav-tab"
          :class="{ active: activeTab === tab.id }"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>
    </nav>

    <!-- Content -->
    <main class="dashboard-content">
      <div class="content-container">
        <!-- Projects Tab -->
        <div v-if="activeTab === 'projects'" class="tab-content">
          <div class="tab-header">
            <h2 class="tab-title">Gestión de Proyectos</h2>
            <button @click="openProjectModal()" class="add-btn">
              <span class="btn-icon">➕</span>
              Nuevo Proyecto
            </button>
          </div>

          <div v-if="loadingProjects" class="loading">
            <div class="loading-spinner"></div>
            <p>Cargando proyectos...</p>
          </div>

          <div v-else class="projects-grid">
            <div
              v-for="project in projects"
              :key="project.id"
              class="project-card"
              :class="{ featured: project.featured }"
            >
              <div class="project-image">
                <img :src="project.image_url" :alt="project.title" />
                <div v-if="project.featured" class="featured-badge">⭐ Destacado</div>
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
                <div class="project-actions">
                  <button
                    @click="openProjectModal(project)"
                    class="action-btn edit-btn"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    @click="deleteProject(project.id)"
                    class="action-btn delete-btn"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Info Tab -->
        <div v-if="activeTab === 'personal'" class="tab-content">
          <div class="tab-header">
            <h2 class="tab-title">Información Personal</h2>
          </div>

          <div v-if="loadingPersonal" class="loading">
            <div class="loading-spinner"></div>
            <p>Cargando información...</p>
          </div>

          <form v-else @submit.prevent="updatePersonalInfo" class="personal-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Nombre Completo</label>
                <input
                  v-model="personalForm.name"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Título Profesional</label>
                <input
                  v-model="personalForm.title"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Biografía</label>
              <textarea
                v-model="personalForm.bio"
                class="form-input form-textarea"
                rows="6"
                required
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input
                  v-model="personalForm.email"
                  type="email"
                  class="form-input"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Teléfono</label>
                <input
                  v-model="personalForm.phone"
                  type="tel"
                  class="form-input"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Ubicación</label>
                <input
                  v-model="personalForm.location"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label class="form-label">URL del Avatar</label>
                <input
                  v-model="personalForm.avatar_url"
                  type="url"
                  class="form-input"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">URL del CV</label>
              <input
                v-model="personalForm.resume_url"
                type="url"
                class="form-input"
              />
            </div>

            <button
              type="submit"
              class="submit-btn"
              :disabled="updatingPersonal"
            >
              <span v-if="updatingPersonal" class="loading-spinner"></span>
              <span v-if="updatingPersonal">Guardando...</span>
              <span v-else>Guardar Cambios</span>
            </button>
          </form>
        </div>

        <!-- Messages Tab -->
        <div v-if="activeTab === 'messages'" class="tab-content">
          <div class="tab-header">
            <h2 class="tab-title">Mensajes de Contacto</h2>
            <div class="messages-stats">
              <span class="stat">
                Total: {{ messages.length }}
              </span>
              <span class="stat new">
                Nuevos: {{ messages.filter(m => m.status === 'new').length }}
              </span>
            </div>
          </div>

          <div v-if="loadingMessages" class="loading">
            <div class="loading-spinner"></div>
            <p>Cargando mensajes...</p>
          </div>

          <div v-else class="messages-list">
            <div
              v-for="message in messages"
              :key="message.id"
              class="message-card"
              :class="{ new: message.status === 'new' }"
            >
              <div class="message-header">
                <div class="message-info">
                  <h3 class="message-sender">{{ message.name }}</h3>
                  <p class="message-email">{{ message.email }}</p>
                </div>
                <div class="message-meta">
                  <span class="message-date">{{ formatDate(message.created_at) }}</span>
                  <span class="message-status" :class="message.status">
                    {{ message.status === 'new' ? 'Nuevo' : 'Leído' }}
                  </span>
                </div>
              </div>
              <div class="message-content">
                <h4 class="message-subject">{{ message.subject }}</h4>
                <p class="message-text">{{ message.message }}</p>
              </div>
              <div class="message-actions">
                <a
                  :href="`mailto:${message.email}?subject=Re: ${message.subject}`"
                  class="action-btn reply-btn"
                >
                  📧 Responder
                </a>
                <button
                  v-if="message.status === 'new'"
                  @click="markAsRead(message.id)"
                  class="action-btn read-btn"
                >
                  ✓ Marcar como leído
                </button>
              </div>
            </div>

            <div v-if="messages.length === 0" class="empty-state">
              <div class="empty-icon">📭</div>
              <h3>No hay mensajes</h3>
              <p>Los mensajes de contacto aparecerán aquí.</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Project Modal -->
    <div v-if="showProjectModal" class="modal-overlay" @click="closeProjectModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto' }}
          </h3>
          <button @click="closeProjectModal" class="modal-close">✕</button>
        </div>

        <form @submit.prevent="saveProject" class="project-form">
          <div class="form-group">
            <label class="form-label">Título del Proyecto</label>
            <input
              v-model="projectForm.title"
              type="text"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea
              v-model="projectForm.description"
              class="form-input form-textarea"
              rows="4"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">URL de la Imagen</label>
            <input
              v-model="projectForm.image_url"
              type="url"
              class="form-input"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">URL del Proyecto</label>
              <input
                v-model="projectForm.project_url"
                type="url"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">URL de GitHub</label>
              <input
                v-model="projectForm.github_url"
                type="url"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Tecnologías (separadas por comas)</label>
            <input
              v-model="technologiesInput"
              type="text"
              class="form-input"
              placeholder="Vue.js, Node.js, PostgreSQL"
            />
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input
                v-model="projectForm.featured"
                type="checkbox"
                class="checkbox-input"
              />
              <span class="checkbox-custom"></span>
              Proyecto Destacado
            </label>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeProjectModal" class="cancel-btn">
              Cancelar
            </button>
            <button type="submit" class="save-btn" :disabled="savingProject">
              <span v-if="savingProject" class="loading-spinner"></span>
              <span v-if="savingProject">Guardando...</span>
              <span v-else>{{ editingProject ? 'Actualizar' : 'Crear' }} Proyecto</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, db, type Project, type PersonalInfo, type ContactMessage } from '../../lib/supabase'

const router = useRouter()
const user = ref<any>(null)
const activeTab = ref('projects')

// Projects
const projects = ref<Project[]>([])
const loadingProjects = ref(true)
const showProjectModal = ref(false)
const editingProject = ref<Project | null>(null)
const savingProject = ref(false)

// Personal Info
const personalInfo = ref<PersonalInfo | null>(null)
const loadingPersonal = ref(true)
const updatingPersonal = ref(false)

// Messages
const messages = ref<ContactMessage[]>([])
const loadingMessages = ref(true)

const tabs = [
  { id: 'projects', label: 'Proyectos', icon: '🚀' },
  { id: 'personal', label: 'Información Personal', icon: '👤' },
  { id: 'messages', label: 'Mensajes', icon: '💬' }
]

const projectForm = reactive({
  title: '',
  description: '',
  image_url: '',
  project_url: '',
  github_url: '',
  technologies: [] as string[],
  featured: false
})

const personalForm = reactive({
  name: '',
  title: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  avatar_url: '',
  resume_url: ''
})

const technologiesInput = computed({
  get: () => projectForm.technologies.join(', '),
  set: (value: string) => {
    projectForm.technologies = value.split(',').map(t => t.trim()).filter(t => t)
  }
})

// Load data
const loadProjects = async () => {
  try {
    loadingProjects.value = true
    projects.value = await db.getProjects()
  } catch (error) {
    console.error('Error loading projects:', error)
  } finally {
    loadingProjects.value = false
  }
}

const loadPersonalInfo = async () => {
  try {
    loadingPersonal.value = true
    const info = await db.getPersonalInfo()
    if (info) {
      personalInfo.value = info
      Object.assign(personalForm, info)
    }
  } catch (error) {
    console.error('Error loading personal info:', error)
  } finally {
    loadingPersonal.value = false
  }
}

const loadMessages = async () => {
  try {
    loadingMessages.value = true
    messages.value = await db.getContactMessages()
  } catch (error) {
    console.error('Error loading messages:', error)
  } finally {
    loadingMessages.value = false
  }
}

// Project operations
const openProjectModal = (project?: Project) => {
  if (project) {
    editingProject.value = project
    Object.assign(projectForm, project)
  } else {
    editingProject.value = null
    Object.assign(projectForm, {
      title: '',
      description: '',
      image_url: '',
      project_url: '',
      github_url: '',
      technologies: [],
      featured: false
    })
  }
  showProjectModal.value = true
}

const closeProjectModal = () => {
  showProjectModal.value = false
  editingProject.value = null
}

const saveProject = async () => {
  try {
    savingProject.value = true
    
    const projectData = {
      title: projectForm.title,
      description: projectForm.description,
      image_url: projectForm.image_url,
      project_url: projectForm.project_url || undefined,
      github_url: projectForm.github_url || undefined,
      technologies: projectForm.technologies,
      featured: projectForm.featured
    }

    if (editingProject.value) {
      await db.updateProject(editingProject.value.id, projectData)
    } else {
      await db.createProject(projectData as any)
    }

    await loadProjects()
    closeProjectModal()
  } catch (error) {
    console.error('Error saving project:', error)
  } finally {
    savingProject.value = false
  }
}

const deleteProject = async (id: string) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
    return
  }

  try {
    await db.deleteProject(id)
    await loadProjects()
  } catch (error) {
    console.error('Error deleting project:', error)
  }
}

// Personal info operations
const updatePersonalInfo = async () => {
  try {
    updatingPersonal.value = true
    await db.updatePersonalInfo(personalForm)
    alert('Información actualizada exitosamente')
  } catch (error) {
    console.error('Error updating personal info:', error)
    alert('Error al actualizar la información')
  } finally {
    updatingPersonal.value = false
  }
}

// Message operations
const markAsRead = async (id: string) => {
  try {
    await db.updateMessageStatus(id, 'read')
    await loadMessages()
  } catch (error) {
    console.error('Error updating message status:', error)
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Auth
const handleLogout = async () => {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    await supabase.auth.signOut()
    router.push('/admin')
  }
}

onMounted(async () => {
  // Check authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    router.push('/admin')
    return
  }

  user.value = session.user

  // Load all data
  await Promise.all([
    loadProjects(),
    loadPersonalInfo(),
    loadMessages()
  ])
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: #000;
}

/* Header */
.dashboard-header {
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  padding: 1.5rem 0;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
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

.logo::before {
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

.dashboard-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #FFD700;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-email {
  color: #C0C0C0;
  font-size: 0.9rem;
}

.logout-btn {
  background: transparent;
  color: #C0C0C0;
  border: 1px solid rgba(255, 215, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  color: #FFD700;
  border-color: #FFD700;
}

/* Navigation */
.dashboard-nav {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  padding: 1rem 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #C0C0C0;
  border: 1px solid rgba(255, 215, 0, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-tab:hover,
.nav-tab.active {
  color: #000;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-color: #FFD700;
}

.tab-icon {
  font-size: 1rem;
}

/* Content */
.dashboard-content {
  padding: 2rem 0;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.tab-content {
  min-height: 600px;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.tab-title {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  color: #FFD700;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

.btn-icon {
  font-size: 1rem;
}

/* Loading */
.loading {
  text-align: center;
  padding: 4rem 0;
  color: #C0C0C0;
}

.loading-spinner {
  width: 30px;
  height: 30px;
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

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card:hover {
  border-color: rgba(255, 215, 0, 0.3);
  transform: translateY(-2px);
}

.project-card.featured {
  border-color: rgba(255, 215, 0, 0.3);
}

.project-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #FFD700;
}

.project-description {
  color: #C0C0C0;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.project-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.edit-btn:hover {
  background: rgba(255, 215, 0, 0.2);
}

.delete-btn {
  background: rgba(239, 68, 68, 0.1);
  color: rgb(239, 68, 68);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* Forms */
.personal-form,
.project-form {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  padding: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #FFD700;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 6px;
  color: #fff;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #FFD700;
  background: rgba(255, 255, 255, 0.08);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  color: #C0C0C0;
  font-size: 0.9rem;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-color: #FFD700;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  font-size: 0.75rem;
  font-weight: 600;
}

.submit-btn {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Messages */
.messages-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  background: rgba(255, 255, 255, 0.05);
  color: #C0C0C0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.stat.new {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.message-card.new {
  border-color: rgba(255, 215, 0, 0.3);
  background: rgba(255, 215, 0, 0.05);
}

.message-card:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 215, 0, 0.3);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.message-sender {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #FFD700;
}

.message-email {
  color: #C0C0C0;
  margin: 0;
  font-size: 0.9rem;
}

.message-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.message-date {
  color: #888;
  font-size: 0.8rem;
}

.message-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.message-status.new {
  background: rgba(255, 215, 0, 0.2);
  color: #FFD700;
}

.message-status.read {
  background: rgba(34, 197, 94, 0.2);
  color: rgb(34, 197, 94);
}

.message-subject {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #fff;
}

.message-text {
  color: #C0C0C0;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.message-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.reply-btn {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  border: 1px solid rgba(255, 215, 0, 0.3);
  text-decoration: none;
}

.reply-btn:hover {
  background: rgba(255, 215, 0, 0.2);
}

.read-btn {
  background: rgba(34, 197, 94, 0.1);
  color: rgb(34, 197, 94);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.read-btn:hover {
  background: rgba(34, 197, 94, 0.2);
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
  margin: 0 0 0.5rem 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: #000;
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #FFD700;
}

.modal-close {
  background: none;
  border: none;
  color: #C0C0C0;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.modal-close:hover {
  color: #FFD700;
}

.project-form {
  margin: 0;
  border: none;
  border-radius: 0;
  padding: 2rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
}

.cancel-btn {
  background: transparent;
  color: #C0C0C0;
  border: 1px solid rgba(192, 192, 192, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  color: #fff;
  border-color: rgba(192, 192, 192, 0.5);
}

.save-btn {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .header-container,
  .nav-container,
  .content-container {
    padding: 0 1rem;
  }

  .header-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .nav-container {
    flex-wrap: wrap;
  }

  .tab-header {
    flex-direction: column;
    align-items: stretch;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .message-header {
    flex-direction: column;
    align-items: stretch;
  }

  .message-meta {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-content {
    max-height: 95vh;
  }

  .project-form {
    padding: 1.5rem;
  }

  .modal-header {
    padding: 1rem 1.5rem;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>