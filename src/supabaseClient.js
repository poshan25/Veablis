import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vluxgvwxrctiayvpzidf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdXhndnd4cmN0aWF5dnB6aWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NDIyMzMsImV4cCI6MjA2NTQxODIzM30.t82meTiN69Ty5BwWxSXVZQ7xgt33TYl-stVnrdsZiWg'; // replace with your anon key

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
