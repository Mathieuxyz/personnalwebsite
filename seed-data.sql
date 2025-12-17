BEGIN;

-- Extension pour générer des UUID (si pas déjà installée)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Nettoyage : supprime les tables si elles existent
DROP TABLE IF EXISTS cv_section_items CASCADE;
DROP TABLE IF EXISTS cv_sections CASCADE;
DROP TABLE IF EXISTS cvs CASCADE;
DROP TABLE IF EXISTS blog_articles CASCADE;

-- Création des tables selon db/schema.tsx
CREATE TABLE cvs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL
);

CREATE TABLE cv_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cv_id uuid NOT NULL REFERENCES cvs(id) ON DELETE CASCADE,
  title text NOT NULL,
  subtitle text,
  sort_order text
);

CREATE TABLE cv_section_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES cv_sections(id) ON DELETE CASCADE,
  headline text NOT NULL,
  subline text,
  description text
);

CREATE TABLE blog_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  image text NOT NULL,
  published_at timestamptz NOT NULL,
  slug text NOT NULL,
  content text NOT NULL,
  featured boolean DEFAULT false
);

-- Insertion des données initiales
TRUNCATE TABLE cv_section_items, cv_sections, cvs, blog_articles RESTART IDENTITY CASCADE;

INSERT INTO cvs (id, title, subtitle) VALUES
  ('9f3ab8fa-57c3-46ab-9363-0a112b8d7a9b', 'Curriculum Vitae', 'Aviation passionate, computer science and electronics enthusiast');

INSERT INTO cv_sections (id, cv_id, title, subtitle, sort_order) VALUES
  ('f6b3df51-8c05-4c7c-bec2-1b5987b7c7f8', '9f3ab8fa-57c3-46ab-9363-0a112b8d7a9b', 'Education', 'Mostly engineering, computer science and electronics', '1'),
  ('8910b605-1f62-4add-9afd-d1282c58e445', '9f3ab8fa-57c3-46ab-9363-0a112b8d7a9b', 'Flight training', '+ 40 hours of total flight time + Flew on DG400, Twin II, Twin III, Tecnam P2008 JC, Tomahowk, Cessna 152 + Class 1 Medical certificate valid until 02/10/2026 + Passionate since the age of 7', '2'),
  ('c9b19794-7086-4f61-b0d2-7466a39aea66', '9f3ab8fa-57c3-46ab-9363-0a112b8d7a9b', 'Languages', NULL, '3'),
  ('d02aa889-3454-4f9f-9f19-8bd88e843637', '9f3ab8fa-57c3-46ab-9363-0a112b8d7a9b', 'Useful links', NULL, '4');

INSERT INTO cv_section_items (id, section_id, headline, subline, description) VALUES
  ('709ef64e-41a1-4466-9ff5-4c2deb0e1c3f', 'f6b3df51-8c05-4c7c-bec2-1b5987b7c7f8', 'ECAM/RMA', '2023 - 2026', 'Bachelor in industrial engineering, major in computer science and electronics'),
  ('f183d030-2c4c-4ee0-bbaf-9f1891d6400b', 'f6b3df51-8c05-4c7c-bec2-1b5987b7c7f8', 'TUDelft', '2022 - 2023', 'Engineering preparation year - Faculty of mechanical engineering - 60ECTS'),
  ('56301b6b-98e2-4a15-a09f-6c0f03d9a07b', 'f6b3df51-8c05-4c7c-bec2-1b5987b7c7f8', 'College Saint-Michel', '2015 - 2021', 'High school diploma - Science and mathematics major'),
  ('316c6c2e-96f7-4f4f-951e-774a9740a7d7', '8910b605-1f62-4add-9afd-d1282c58e445', 'Sabena Aeroclub', '2025 - Now', 'PPL on P208 JC'),
  ('564d2417-237c-4d82-967e-a7c6d8311318', '8910b605-1f62-4add-9afd-d1282c58e445', 'RBAC', '2021 - 2024', 'SPL on Twin II, Twin III and DG400'),
  ('1df1315a-70c3-43d5-8899-3170f12eac3d', 'c9b19794-7086-4f61-b0d2-7466a39aea66', 'French', 'Native', NULL),
  ('6b91a665-f26b-42db-b567-1c0bff98982a', 'c9b19794-7086-4f61-b0d2-7466a39aea66', 'Dutch', 'C1 level, fluent', NULL),
  ('2dfb8893-3566-4c81-9ba6-0189d09a47d7', 'c9b19794-7086-4f61-b0d2-7466a39aea66', 'English', 'C1 level, fluent', NULL),
  ('a93c88d6-5dab-4ac4-9ad0-55ef6d262e66', 'c9b19794-7086-4f61-b0d2-7466a39aea66', 'Portuguese', 'B1 level, fluent', NULL),
  ('9ecbf026-9a05-4b44-86de-8864c8ad1075', 'c9b19794-7086-4f61-b0d2-7466a39aea66', 'German', 'A2 level, basic knowledge', NULL);

INSERT INTO blog_articles (id, title, excerpt, image, published_at, slug, content, featured) VALUES
  ('3e984d73-f0ae-4fb3-9c0e-52f5c125d862', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', '/Flower.jpg', '2025-03-01T00:00:00Z', 'lorem-ipsum-dolor', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', false),
  ('5c327982-3ffc-4914-a6e8-a04e6ac849ce', 'Consectetur adipiscing elit', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.', '/Lisboa.jpg', '2025-02-18T00:00:00Z', 'consectetur-adipiscing', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.', false),
  ('3c7be0d0-7e6c-4bcb-87d0-a962533306d2', 'Sed do eiusmod tempor', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', '/TurkishIceMan.jpg', '2025-02-02T00:00:00Z', 'sed-do-eiusmod', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.', false),
  ('d1a9f0dc-f682-4090-8d0f-3e65f7b3cd34', 'Incididunt ut labore et dolore', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.', '/SAG.jpg', '2025-01-20T00:00:00Z', 'incididunt-labore-dolore', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus.', false),
  ('64edffff-864e-4e6e-bc5f-2efa12ee5a55', 'Magna aliqua ut enim', 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.', '/LA.jpg', '2025-01-05T00:00:00Z', 'magna-aliqua-enim', 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit.', false),
  ('cfaa20de-7099-4f8a-a1e1-98e65ce42928', 'Quis nostrud exercitation', 'Nullam varius, turpis et commodo pharetra, est eros bibendum elit.', '/LASunset.jpg', '2024-12-22T00:00:00Z', 'quis-nostrud-exercitation', 'Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.', false),
  ('b5c2e8de-b70b-47d2-8fdf-acb28cf38359', 'Ullamco laboris nisi', 'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.', '/IndianStreetFood.jpg', '2024-12-01T00:00:00Z', 'ullamco-laboris-nisi', 'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit.', false);

COMMIT;
