// ============================================================
// IMPORTANT: Replace these values with YOUR Supabase project's
// values from Dashboard → Settings → API
// ============================================================

const SUPABASE_URL = 'https://ktebdpbihqygipwmxqkq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZWJkcGJpaHF5Z2lwd214cWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTU3MzgsImV4cCI6MjA5NjU5MTczOH0.iQdudIBROJhXCOGWgvnjbnzikbmxuCcyF0Rn_uSCAUw';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: redirect to login if NOT signed in
async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  return session.user;
}

// Helper: redirect to dashboard if ALREADY signed in
async function redirectIfAuthed() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = 'dashboard.html';
  }
}

// Helper for escaping HTML to prevent XSS
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function fmtMoney(n) {
  return '$' + Number(n || 0).toFixed(2);
}
