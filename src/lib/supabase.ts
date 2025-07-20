import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://bvothnyehwlmfkpolqik.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2b3RobnllaHdsbWZrcG9scWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NjgxNjEsImV4cCI6MjA2ODU0NDE2MX0.6eAScXyw5fyPb9bQ39A7gFjrM_31pDD2JEpw0VUaoYM';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration')
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