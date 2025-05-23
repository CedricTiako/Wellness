export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: Category;
  author: string;
  author_image?: string;
  published_at: string;
  featured: boolean;
  reading_time: number;
}

export type Category = 'nutrition' | 'body' | 'mental' | 'routines';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  preview_url?: string;
  type: 'ebook' | 'program' | 'audio';
  featured: boolean;
}

export interface DailyWellnessCheck {
  id: string;
  user_id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  sleep_hours?: number;
  water_intake?: number;
  exercise_minutes?: number;
  meditation_minutes?: number;
  notes?: string;
}

export interface Newsletter {
  email: string;
  first_name?: string;
  subscribed_at: string;
  lead_source?: string;
}