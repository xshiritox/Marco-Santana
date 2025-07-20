import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  project_url?: string
  github_url?: string
  technologies: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export interface PersonalInfo {
  id: string
  name: string
  title: string
  bio: string
  email: string
  phone?: string
  location?: string
  avatar_url?: string
  resume_url?: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  created_at: string
}

// Database functions
export const db = {
  // Projects
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Personal Info
  async getPersonalInfo(): Promise<PersonalInfo | null> {
    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updatePersonalInfo(updates: Partial<PersonalInfo>): Promise<PersonalInfo> {
    const { data, error } = await supabase
      .from('personal_info')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', (await this.getPersonalInfo())?.id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Contact Messages
  async createContactMessage(message: Omit<ContactMessage, 'id' | 'status' | 'created_at'>): Promise<ContactMessage> {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert(message)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async updateMessageStatus(id: string, status: string): Promise<void> {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
    
    if (error) throw error
  }
}