// ============================================
// Supabase Configuration
// ============================================
// 1. Go to https://supabase.com/dashboard
// 2. Open your project → Settings → API
// 3. Copy "Project URL" and "anon public" key below

const SUPABASE_URL = 'https://klixnzxeeijhrbqjxwvz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsaXhuenhlZWlqaHJicWp4d3Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MDg4OTYsImV4cCI6MjA4Nzk4NDg5Nn0.PdFPQyxjgNaQpNZIOCLDjhbeA72rTV7U3ttHjMohlYk';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
