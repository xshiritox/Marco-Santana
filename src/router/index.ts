import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: {
        title: 'Marco Santana - Desarrollador Web Freelance Colombia',
        description: 'Desarrollador web freelance especializado en diseño y desarrollo web profesional en Colombia. Servicios de desarrollo web en Bogotá, Medellín y Cali.'
      }
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: () => import('../views/Portfolio.vue'),
      meta: {
        title: 'Portafolio - Marco Santana | Proyectos Web Colombia',
        description: 'Conoce los proyectos web desarrollados por Marco Santana. Portfolio de desarrollo web, e-commerce y aplicaciones para clientes en Colombia.'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue'),
      meta: {
        title: 'Sobre Mí - Marco Santana | Diseñador Web Freelance',
        description: 'Conoce la experiencia y trayectoria de Marco Santana, desarrollador web freelance especializado en servicios de diseño web en Colombia.'
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue'),
      meta: {
        title: 'Contacto - Marco Santana | Servicios Diseño Web Bogotá',
        description: 'Contacta a Marco Santana para servicios de desarrollo y diseño web profesional en Colombia. Presupuestos sin compromiso.'
      }
    },
    {
      path: '/admin',
      name: 'AdminLogin',
      component: () => import('../views/admin/Login.vue'),
      meta: {
        title: 'Admin - Marco Santana Portfolio',
        description: 'Panel de administración'
      }
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('../views/admin/Dashboard.vue'),
      meta: {
        title: 'Dashboard Admin - Marco Santana',
        description: 'Panel de administración',
        requiresAuth: true
      }
    }
  ]
})

// Navigation guard for auth protection
router.beforeEach(async (to, _from, next) => {
  // Update document title and meta description
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
  
  if (to.meta?.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description as string)
    }
  }

  // Check auth for protected routes
  if (to.meta?.requiresAuth) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      next('/admin')
      return
    }
  }

  next()
})

export default router