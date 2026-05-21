/*
  # Create newsletter_subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key, auto-generated)
      - `email` (text, unique, not null)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for anonymous users to insert their own email (public signup)
    - No select/update/delete policies for public — data only accessible server-side
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (email IS NOT NULL AND email <> '');
