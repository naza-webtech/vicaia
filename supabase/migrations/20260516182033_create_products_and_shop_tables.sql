/*
  # Create products and shop tables

  1. New Tables
    - `categories` (Skincare, Jewelry, Hair, Fragrance, Apparel)
    - `products` (all products with category, price, images)
    - `wishlist_items` (user wishlist, keyed by session)
    - `cart_items` (user cart, keyed by session)

  2. Security
    - Enable RLS on all tables
    - Public read access for products and categories
    - Session-based access for cart/wishlist
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  long_description text,
  price decimal(10, 2) NOT NULL,
  image_url text,
  images text[],
  in_stock boolean DEFAULT true,
  rating numeric(2, 1) DEFAULT 5.0,
  reviews_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, product_id)
);

ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Wishlist items are publicly accessible"
  ON wishlist_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add to wishlist"
  ON wishlist_items FOR INSERT
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Anyone can remove from wishlist"
  ON wishlist_items FOR DELETE
  USING (true);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, product_id)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cart items are publicly accessible"
  ON cart_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add to cart"
  ON cart_items FOR INSERT
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Anyone can update cart"
  ON cart_items FOR UPDATE
  USING (true)
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Anyone can remove from cart"
  ON cart_items FOR DELETE
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_wishlist_session ON wishlist_items(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_session ON cart_items(session_id);
