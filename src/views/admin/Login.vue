<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="admin-logo">
            <span class="logo-text">MS</span>
          </div>
          <h1 class="login-title">Panel de Administración</h1>
          <p class="login-subtitle">Marco Santana Portfolio</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form-input"
              :class="{ error: errors.email }"
              placeholder="admin@marcosantana.dev"
              required
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Contraseña</label>
            <div class="password-input">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                :class="{ error: errors.password }"
                placeholder="Tu contraseña"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <span v-if="showPassword">👁️</span>
                <span v-else>🙈</span>
              </button>
            </div>
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <button
            type="submit"
            class="login-btn"
            :disabled="loading"
            :class="{ loading }"
          >
            <span v-if="loading" class="loading-spinner"></span>
            <span v-if="loading">Iniciando sesión...</span>
            <span v-else>Iniciar Sesión</span>
          </button>

          <div v-if="errorMessage" class="error-alert">
            <div class="error-icon">❌</div>
            <div class="error-content">
              <p>{{ errorMessage }}</p>
            </div>
          </div>
        </form>

        <div class="login-footer">
          <p class="footer-text">
            Acceso restringido únicamente para el administrador del portfolio.
          </p>
          <router-link to="/" class="back-link">
            ← Volver al sitio principal
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'El email es requerido'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Por favor ingresa un email válido'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'La contraseña es requerida'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password
    })

    if (error) {
      throw error
    }

    // Successful login
    router.push('/admin/dashboard')
  } catch (error: any) {
    console.error('Login error:', error)
    
    if (error.message.includes('Invalid login credentials')) {
      errorMessage.value = 'Credenciales incorrectas. Por favor verifica tu email y contraseña.'
    } else if (error.message.includes('Email not confirmed')) {
      errorMessage.value = 'Por favor confirma tu email antes de iniciar sesión.'
    } else {
      errorMessage.value = 'Error al iniciar sesión. Por favor intenta de nuevo.'
    }
  } finally {
    loading.value = false
  }
}

// Check if user is already logged in
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    router.push('/admin/dashboard')
  }
})
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    radial-gradient(ellipse at center, rgba(255, 215, 0, 0.03) 0%, transparent 70%),
    #000;
  padding: 2rem 1rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
}

.login-header {
  margin-bottom: 2.5rem;
}

.admin-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  position: relative;
  overflow: hidden;
}

.admin-logo::before {
  content: '';
  position: absolute;
  inset: 2px;
  background: #000;
  border-radius: 13px;
}

.logo-text {
  color: #FFD700;
  font-weight: 700;
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
}

.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #FFD700;
}

.login-subtitle {
  color: #C0C0C0;
  margin: 0;
  font-size: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
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
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #FFD700;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.form-input.error {
  border-color: #ff4444;
}

.form-input::placeholder {
  color: #888;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #C0C0C0;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #FFD700;
}

.error-message {
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.login-btn {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  border: none;
  padding: 1.25rem;
  border-radius: 10px;
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

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

.login-btn:disabled {
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

.error-alert {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  margin-top: 1rem;
}

.error-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.error-content p {
  margin: 0;
  color: rgb(239, 68, 68);
  font-size: 0.9rem;
}

.login-footer {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
}

.footer-text {
  color: #888;
  font-size: 0.85rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.back-link {
  color: #C0C0C0;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #FFD700;
}

/* Responsive */
@media (max-width: 480px) {
  .admin-login {
    padding: 1rem;
  }

  .login-card {
    padding: 2rem 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
  }
}
</style>