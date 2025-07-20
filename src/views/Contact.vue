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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db, type PersonalInfo } from '../lib/supabase'

const personalInfo = ref<PersonalInfo | null>(null)

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
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.contact-info {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 215, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}

.info-title {
  font-size: 1.5rem;
  color: #FFD700;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;
  text-align: center;
}

.info-title::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 60px;
  height: 3px;
  background: #FFD700;
  border-radius: 2px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  gap: 1.25rem;
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.info-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.2);
}

.info-icon {
  font-size: 1.5rem;
  color: #FFD700;
  width: 50px;
  height: 50px;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-label {
  color: #E2E8F0;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
}

.info-value {
  color: #94A3B8;
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.info-link {
  color: #FFD700;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.info-link:hover {
  color: #FFE44D;
  text-decoration: underline;
}

.quick-actions {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
}

.actions-title {
  color: #E2E8F0;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
}

.actions-grid {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.action-btn {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 180px;
}

.action-btn:hover {
  background: rgba(255, 215, 0, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-icon {
  font-size: 1.2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .info-grid {
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