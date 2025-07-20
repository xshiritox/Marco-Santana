<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-container">
        <!-- Logo and Brand -->
        <div class="brand">
          <div class="logo">
            <span class="logo-text">MS</span>
          </div>
          <span class="brand-name">Marco Santana</span>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          class="mobile-toggle"
          @click="toggleMobileMenu"
          :class="{ active: isMobileMenuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Navigation Links -->
        <div class="nav-links" :class="{ open: isMobileMenuOpen }">
          <router-link 
            to="/" 
            class="nav-link"
            @click="() => {
              closeMobileMenu();
              scrollToTop();
            }"
          >
            Inicio
          </router-link>
          <router-link 
            to="/portfolio" 
            class="nav-link"
            @click="closeMobileMenu"
          >
            Portafolio
          </router-link>
          <router-link 
            to="/about" 
            class="nav-link"
            @click="closeMobileMenu"
          >
            Sobre Mí
          </router-link>
          <router-link 
            to="/contact" 
            class="nav-link cta"
            @click="closeMobileMenu"
          >
            Contacto
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.nav {
  height: 80px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 12px;
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
  border-radius: 11px;
}

.logo-text {
  color: #FFD700;
  font-weight: 700;
  font-size: 1.25rem;
  position: relative;
  z-index: 1;
}

.brand-name {
  color: #FFD700;
  font-size: 1.25rem;
  font-weight: 600;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
}

.mobile-toggle span {
  width: 100%;
  height: 2px;
  background: #FFD700;
  transition: 0.3s;
  margin: 3px 0;
}

.mobile-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #C0C0C0;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #FFD700;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #FFD700;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: #FFD700;
}

.nav-link.cta {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nav-link.cta::after {
  display: none;
}

.nav-link.cta:hover {
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }

  .mobile-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.98);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link.cta {
    margin-top: 1rem;
  }
}
</style>