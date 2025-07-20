<template>
  <div class="contact">
    <div class="container">
      <!-- Header -->
      <div class="contact-header">
        <h1 class="page-title">Contacto</h1>
        <p class="page-description">
          ¿Tienes un proyecto en mente? Me encantaría conocer más sobre tu idea 
          y cómo puedo ayudarte a hacerla realidad.
        </p>
      </div>

      <div class="contact-content">
        <!-- Contact Information -->
        <div class="contact-info">
          <h2 class="info-title">Información de Contacto</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-icon">📧</div>
              <div class="info-content">
                <h3 class="info-label">Email</h3>
                <p class="info-value" v-if="personalInfo">{{ personalInfo.email }}</p>
                <a 
                  v-if="personalInfo" 
                  :href="`mailto:${personalInfo.email}`"
                  class="info-link"
                >
                  Enviar email
                </a>
              </div>
            </div>

            <div class="info-item" v-if="personalInfo?.phone">
              <div class="info-icon">📱</div>
              <div class="info-content">
                <h3 class="info-label">Teléfono</h3>
                <p class="info-value">{{ personalInfo.phone }}</p>
                <a 
                  :href="`tel:${personalInfo.phone}`"
                  class="info-link"
                >
                  Llamar ahora
                </a>
              </div>
            </div>

            <div class="info-item" v-if="personalInfo?.location">
              <div class="info-icon">📍</div>
              <div class="info-content">
                <h3 class="info-label">Ubicación</h3>
                <p class="info-value">{{ personalInfo.location }}</p>
                <span class="info-link">Disponible para reuniones virtuales</span>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">⏰</div>
              <div class="info-content">
                <h3 class="info-label">Horario de Respuesta</h3>
                <p class="info-value">24-48 horas</p>
                <span class="info-link">Lunes a Viernes, 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            <h3 class="actions-title">¿Prefieres otra forma de contacto?</h3>
            <div class="actions-grid">
              <a 
                v-if="personalInfo?.email" 
                :href="`mailto:${personalInfo.email}?subject=Consulta sobre servicios web`"
                class="action-btn"
              >
                <span class="action-icon">📧</span>
                <span>Email Directo</span>
              </a>
              <a 
                v-if="personalInfo?.phone" 
                :href="`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}?text=Hola Marco, me interesa conocer más sobre tus servicios de desarrollo web.`"
                target="_blank"
                class="action-btn"
              >
                <span class="action-icon">💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-section">
          <h2 class="form-title">Envíame un Mensaje</h2>
          <p class="form-description">
            Completa el formulario y me pondré en contacto contigo lo antes posible.
          </p>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name" class="form-label">Nombre Completo *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-input"
                :class="{ error: errors.name }"
                placeholder="Tu nombre completo"
                required
              />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email *</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                :class="{ error: errors.email }"
                placeholder="tu@email.com"
                required
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label for="subject" class="form-label">Asunto *</label>
              <select
                id="subject"
                v-model="form.subject"
                class="form-input"
                :class="{ error: errors.subject }"
                required
              >
                <option value="">Selecciona un asunto</option>
                <option value="Desarrollo Web">Desarrollo Web</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Mantenimiento">Mantenimiento Web</option>
                <option value="Consultoría">Consultoría Técnica</option>
                <option value="Otro">Otro</option>
              </select>
              <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Mensaje *</label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-input form-textarea"
                :class="{ error: errors.message }"
                placeholder="Cuéntame sobre tu proyecto, presupuesto aproximado, timeline, etc."
                rows="6"
                required
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <button
              type="submit"
              class="submit-btn"
              :disabled="submitting"
              :class="{ loading: submitting }"
            >
              <span v-if="submitting" class="loading-spinner"></span>
              <span v-if="submitting">Enviando...</span>
              <span v-else>Enviar Mensaje</span>
            </button>

            <!-- Success/Error Messages -->
            <div v-if="submitStatus === 'success'" class="success-message">
              <div class="success-icon">✅</div>
              <div class="success-content">
                <h4>¡Mensaje enviado exitosamente!</h4>
                <p>Gracias por contactarme. Te responderé en las próximas 24-48 horas.</p>
              </div>
            </div>

            <div v-if="submitStatus === 'error'" class="error-alert">
              <div class="error-icon">❌</div>
              <div class="error-content">
                <h4>Error al enviar el mensaje</h4>
                <p>Por favor intenta de nuevo o contáctame directamente por email.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { db, type PersonalInfo } from '../lib/supabase'

const personalInfo = ref<PersonalInfo | null>(null)
const submitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  // Name validation
  if (!form.name.trim()) {
    errors.name = 'El nombre es requerido'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'El email es requerido'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Por favor ingresa un email válido'
    isValid = false
  }

  // Subject validation
  if (!form.subject) {
    errors.subject = 'Por favor selecciona un asunto'
    isValid = false
  }

  // Message validation
  if (!form.message.trim()) {
    errors.message = 'El mensaje es requerido'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres'
    isValid = false
  }

  return isValid
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
}

const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  submitting.value = true
  submitStatus.value = 'idle'

  try {
    await db.createContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject,
      message: form.message.trim()
    })

    submitStatus.value = 'success'
    resetForm()
  } catch (error) {
    console.error('Error sending message:', error)
    submitStatus.value = 'error'
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  try {
    personalInfo.value = await db.getPersonalInfo()
  } catch (error) {
    console.error('Error loading personal info:', error)
  }
})
</script>

<style scoped>
.contact {
  padding: 120px 0 6rem 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.contact-header {
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

/* Content */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Contact Info */
.contact-info {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
}

.info-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  color: #FFD700;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
}

.info-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-label {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #FFD700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: #fff;
  font-weight: 500;
}

.info-link {
  color: #C0C0C0;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-link:hover {
  color: #FFD700;
}

/* Quick Actions */
.quick-actions {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
}

.actions-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: #FFD700;
}

.actions-grid {
  display: flex;
  gap: 1rem;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

.action-icon {
  font-size: 1.1rem;
}

/* Contact Form */
.contact-form-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #FFD700;
}

.form-description {
  color: #C0C0C0;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #FFD700;
}

.form-input {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #FFD700;
  background: rgba(255, 255, 255, 0.08);
}

.form-input.error {
  border-color: #ff4444;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-input::placeholder {
  color: #888;
}

.error-message {
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.submit-btn {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  border: none;
  padding: 1.25rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-top: 2px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success/Error Messages */
.success-message,
.error-alert {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
}

.success-message {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.error-alert {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.success-icon,
.error-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.success-content h4,
.error-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.success-content h4 {
  color: rgb(34, 197, 94);
}

.error-content h4 {
  color: rgb(239, 68, 68);
}

.success-content p,
.error-content p {
  margin: 0;
  color: #C0C0C0;
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 768px) {
  .contact {
    padding: 100px 0 4rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-info,
  .contact-form-section {
    padding: 2rem;
  }

  .actions-grid {
    flex-direction: column;
  }

  .action-btn {
    justify-content: center;
  }
}
</style>