CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  faculty TEXT NOT NULL DEFAULT '',
  university TEXT NOT NULL DEFAULT 'Universitas Indonesia',
  bio TEXT NOT NULL DEFAULT '',
  skills TEXT[] NOT NULL DEFAULT '{}',
  reputation NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (reputation >= 0 AND reputation <= 5),
  credits INTEGER NOT NULL DEFAULT 100 CHECK (credits >= 0),
  profile_strength INTEGER NOT NULL DEFAULT 20 CHECK (profile_strength >= 0 AND profile_strength <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can read their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Students can create their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Students can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Students can delete their own profile" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);