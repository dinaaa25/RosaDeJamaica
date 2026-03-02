-- ============================================
-- Rosa de Jamaica — Supabase Database Setup
-- ============================================
-- Run this entire script in your Supabase SQL Editor:
-- Dashboard → SQL Editor → New Query → Paste & Run

-- 1. Products (hero slider packs)
CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  menu_name TEXT NOT NULL,
  name TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT 'Rosa de Jamaica',
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);

-- 2. Organic Products (collection grid)
CREATE TABLE organic_products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

ALTER TABLE organic_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON organic_products FOR SELECT USING (true);

-- 3. Testimonials
CREATE TABLE testimonials (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_age INT,
  image_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);

-- 4. Careers
CREATE TABLE careers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  job_type TEXT NOT NULL,
  location TEXT NOT NULL,
  role_description TEXT NOT NULL,
  responsibilities JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON careers FOR SELECT USING (true);

-- ============================================
-- Seed Data
-- ============================================

INSERT INTO products (menu_name, name, subtitle, price, image_url, display_order) VALUES
  ('Rosa Single Pack',  'Regular Pack',  'Rosa de Jamaica', 10.00, 'images/NewSingleRosa.png', 1),
  ('Rosa Mini Pack',    'Mini Pack',     'Rosa de Jamaica',  5.00, 'images/NewMiniRosa.png',   2),
  ('Rosa Couples Pack', 'Couples Pack',  'Rosa de Jamaica', 15.00, 'images/couplesRosa.png',   3),
  ('Rosa Family Pack',  'Family Pack',   'Rosa de Jamaica', 30.00, 'images/NewFamilyRosa.png', 4),
  ('Rosa For Friends',  'Friends Pack',  'Rosa de Jamaica', 25.00, 'images/rosaFriends.png',   5);

INSERT INTO organic_products (name, image_url, display_order) VALUES
  ('Fresh Hibiskus Lemonade',           'images/lemonade.png', 1),
  ('The Original Rosa After-Work Drink', 'images/alcdrink.png', 2),
  ('Ready-to-Brew Hibiscus Tea',        'images/tea.png',      3),
  ('Homemade Rosa Jam',                 'images/jam.png',      4);

INSERT INTO testimonials (quote, author_name, author_age, image_url, display_order) VALUES
  (
    'Seriously, ditch the sugar-loaded sodas. This Fresh Hibiscus Lemonade is the real deal—super refreshing and it actually tastes clean and zesty.',
    'Alex T.', 25, 'images/reviewBoy.png', 1
  ),
  (
    'This Hibiscus Tea is perfect. It''s natural and a bit sweet. It helped me a lot with my digestion. It makes me feel healthy.',
    'Samantha B.', 30, 'images/reviewGirl.png', 2
  );

INSERT INTO careers (title, job_type, location, role_description, responsibilities) VALUES
  (
    'Content Creator Intern',
    'Internship',
    'Remote / Hybrid - Global',
    'Are you a visual storyteller with a passion for healthy living? We are looking for a creative <strong>Content Creator Intern</strong> to help grow our brand across TikTok, Instagram, and Pinterest. You will be responsible for capturing the vibrant colors of our hibiscus drinks and the authentic lifestyle behind <strong>Rosa de Jamaica</strong>.',
    '["Produce short-form video content (Reels/TikToks) featuring our organic packs.", "Design aesthetic social media graphics using Canva or Adobe Suite.", "Collaborate with our marketing team on campaign vibes and storytelling.", "Engage with our community and capture the Rosa lifestyle."]'
  );
