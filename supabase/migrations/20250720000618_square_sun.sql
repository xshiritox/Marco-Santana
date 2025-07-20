/*
  # Schema para el portfolio de Marco Santana

  1. Nuevas Tablas
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `project_url` (text, optional)
      - `github_url` (text, optional)
      - `technologies` (text array)
      - `featured` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `personal_info`
      - `id` (uuid, primary key)
      - `name` (text)
      - `title` (text)
      - `bio` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `avatar_url` (text, optional)
      - `resume_url` (text, optional)
      - `updated_at` (timestamp)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `status` (text, default 'new')
      - `created_at` (timestamp)

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas para lectura pública en projects y personal_info
    - Políticas para administradores autenticados para modificaciones
    - Políticas para inserción de mensajes de contacto
*/

-- Tabla de proyectos del portafolio
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  project_url text,
  github_url text,
  technologies text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de información personal
CREATE TABLE IF NOT EXISTS personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  avatar_url text,
  resume_url text,
  updated_at timestamptz DEFAULT now()
);

-- Tabla de mensajes de contacto
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Políticas para projects
CREATE POLICY "Projects are viewable by everyone"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true);

-- Políticas para personal_info
CREATE POLICY "Personal info is viewable by everyone"
  ON personal_info
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage personal info"
  ON personal_info
  FOR ALL
  TO authenticated
  USING (true);

-- Políticas para contact_messages
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view and manage contact messages"
  ON contact_messages
  FOR ALL
  TO authenticated
  USING (true);

-- Insertar datos iniciales
INSERT INTO personal_info (name, title, bio, email, phone, location) VALUES (
  'Marco Santana',
  'Desarrollador Web Freelance',
  'Soy un desarrollador web freelance especializado en crear experiencias digitales excepcionales para empresas en Colombia. Con más de 5 años de experiencia, me enfoco en desarrollar sitios web modernos, responsivos y optimizados que impulsan el crecimiento de mis clientes.',
  'marco@marcosantana.dev',
  '+57 300 123 4567',
  'Bogotá, Colombia'
) ON CONFLICT (id) DO NOTHING;

-- Insertar proyectos de ejemplo
INSERT INTO projects (title, description, image_url, project_url, technologies, featured) VALUES 
(
  'E-commerce Moderno',
  'Plataforma de comercio electrónico completa con pasarela de pagos, gestión de inventario y panel administrativo.',
  'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
  'https://ejemplo-ecommerce.com',
  ARRAY['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe'],
  true
),
(
  'Landing Page Corporativa',
  'Sitio web corporativo responsivo con diseño moderno y optimización SEO para una empresa de servicios.',
  'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
  'https://ejemplo-corporativo.com',
  ARRAY['React', 'Next.js', 'Tailwind CSS'],
  true
),
(
  'Dashboard Analítico',
  'Panel de control interactivo para visualización de datos con gráficos en tiempo real y reportes personalizados.',
  'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
  'https://ejemplo-dashboard.com',
  ARRAY['Vue.js', 'Chart.js', 'Firebase'],
  false
) ON CONFLICT (id) DO NOTHING;