-- ============================================================
-- Run this in Supabase Dashboard → SQL Editor → New query → Run
-- This grants permissions to logged-in users (RLS still applies)
-- ============================================================

GRANT USAGE ON SCHEMA public TO authenticated, anon;

GRANT ALL ON public.items TO authenticated;
GRANT ALL ON public.profiles TO authenticated;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Make sure future tables also get permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO authenticated;
