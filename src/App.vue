<template>
  <div id="app">
    <!-- Layout -->
    <Header v-if="!isAdminRoute" />
    
    <main class="main-content" :class="{ 'admin-layout': isAdminRoute }">
      <router-view />
    </main>
    
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'

const route = useRoute()

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #000;
  color: #fff;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.main-content.admin-layout {
  padding-top: 0;
}

/* Utility Classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Selection */
::selection {
  background: rgba(255, 215, 0, 0.3);
  color: #fff;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 215, 0, 0.5);
}

/* Focus States */
a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid rgba(255, 215, 0, 0.5);
  outline-offset: 2px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Responsive Typography */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}

/* Print Styles */
@media print {
  body {
    background: white !important;
    color: black !important;
  }
  
  .header,
  .footer,
  .dashboard-nav {
    display: none !important;
  }
}
</style>