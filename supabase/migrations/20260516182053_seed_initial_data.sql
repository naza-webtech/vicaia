/*
  # Seed initial categories and products

  1. Categories
    - Skincare, Jewelry, Hair, Fragrance, Apparel

  2. Sample Products
    - Multiple products per category for testing
*/

DO $$
DECLARE
  skincare_id uuid;
  jewelry_id uuid;
  hair_id uuid;
  fragrance_id uuid;
  apparel_id uuid;
BEGIN
  -- Insert categories
  INSERT INTO categories (name, slug, description, image_url)
  VALUES
    ('Skincare', 'skincare', 'Luxury skincare essentials', 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=800'),
    ('Jewelry', 'jewelry', 'Gold & silver luxury', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=800'),
    ('Hair', 'hair', 'Premium hair care', 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800'),
    ('Fragrance', 'fragrance', 'Luxury perfumes', 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=800'),
    ('Apparel', 'apparel', 'Premium urban fashion', 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800')
  ON CONFLICT DO NOTHING;

  -- Get category IDs
  SELECT id INTO skincare_id FROM categories WHERE slug = 'skincare' LIMIT 1;
  SELECT id INTO jewelry_id FROM categories WHERE slug = 'jewelry' LIMIT 1;
  SELECT id INTO hair_id FROM categories WHERE slug = 'hair' LIMIT 1;
  SELECT id INTO fragrance_id FROM categories WHERE slug = 'fragrance' LIMIT 1;
  SELECT id INTO apparel_id FROM categories WHERE slug = 'apparel' LIMIT 1;

  -- Insert skincare products
  INSERT INTO products (category_id, name, slug, description, long_description, price, image_url, rating, reviews_count, in_stock)
  VALUES
    (skincare_id, 'VICAIA Signature Scrub', 'vicaia-signature-scrub', 'Premium body scrub', 'Nature meets luxury. Reveal radiant skin with our premium body scrub crafted for those who demand excellence.', 45000, 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=600', 5.0, 42, true),
    (skincare_id, 'Luxury Face Serum', 'luxury-face-serum', 'Premium anti-aging serum', 'Advanced formula with premium ingredients for radiant skin.', 75000, 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 28, true),
    (skincare_id, 'Rose Gold Hydrating Mask', 'rose-gold-mask', 'Luxury hydrating treatment', 'Intensive moisture mask with gold flakes and rose extract.', 55000, 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 35, true),
    (skincare_id, 'Premium Body Butter', 'premium-body-butter', 'Luxury moisturizer', 'Silky body butter with exotic oils and champagne gold shimmer.', 50000, 'https://images.pexels.com/photos/4197603/pexels-photo-4197603.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 52, true)
  ON CONFLICT (slug) DO NOTHING;

  -- Insert jewelry products
  INSERT INTO products (category_id, name, slug, description, long_description, price, image_url, rating, reviews_count, in_stock)
  VALUES
    (jewelry_id, 'Gold Signature Bracelet', 'gold-signature-bracelet', '18K gold luxury bracelet', 'Timeless elegance in solid 18K gold with champagne stone accents.', 180000, 'https://images.pexels.com/photos/1854033/pexels-photo-1854033.jpeg?auto=compress&cs=tinysrgb&w=600', 5.0, 18, true),
    (jewelry_id, 'Diamond Pendant Necklace', 'diamond-pendant', 'Luxury diamond necklace', 'Exquisite pendant with ethically sourced diamond on gold chain.', 250000, 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600', 5.0, 12, true),
    (jewelry_id, 'Rose Gold Ring Set', 'rose-gold-rings', 'Luxury ring collection', 'Three-piece rose gold ring set with elegant band designs.', 95000, 'https://images.pexels.com/photos/696453/pexels-photo-696453.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 21, true)
  ON CONFLICT (slug) DO NOTHING;

  -- Insert hair products
  INSERT INTO products (category_id, name, slug, description, long_description, price, image_url, rating, reviews_count, in_stock)
  VALUES
    (hair_id, 'Luxury Hair Oil', 'luxury-hair-oil', 'Premium hair treatment', 'Silk-infused hair oil with gold particles for luminous shine.', 35000, 'https://images.pexels.com/photos/3985341/pexels-photo-3985341.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 31, true),
    (hair_id, 'Gold Shampoo Bar', 'gold-shampoo-bar', 'Luxury solid shampoo', 'Concentrated shampoo with real gold flakes and premium botanicals.', 28000, 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600', 4.7, 25, true),
    (hair_id, 'Silk Hair Conditioner', 'silk-conditioner', 'Premium hair mask', 'Intensive conditioning treatment for silky, luxurious hair.', 32000, 'https://images.pexels.com/photos/1575818/pexels-photo-1575818.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 38, true)
  ON CONFLICT (slug) DO NOTHING;

  -- Insert fragrance products
  INSERT INTO products (category_id, name, slug, description, long_description, price, image_url, rating, reviews_count, in_stock)
  VALUES
    (fragrance_id, 'VICAIA Eau de Parfum', 'vicaia-eau-de-parfum', 'Signature fragrance', 'Luxury fragrance with notes of oud, rose, and champagne musk.', 120000, 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=600', 5.0, 56, true),
    (fragrance_id, 'Golden Hour Perfume', 'golden-hour', 'Luxury day fragrance', 'Light, fresh fragrance with gold and citrus notes for daytime elegance.', 100000, 'https://images.pexels.com/photos/3966113/pexels-photo-3966113.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 44, true),
    (fragrance_id, 'Midnight Luxe Cologne', 'midnight-luxe', 'Evening fragrance', 'Deep, sophisticated evening fragrance with amber and sandalwood.', 115000, 'https://images.pexels.com/photos/416881/pexels-photo-416881.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 39, true)
  ON CONFLICT (slug) DO NOTHING;

  -- Insert apparel products
  INSERT INTO products (category_id, name, slug, description, long_description, price, image_url, rating, reviews_count, in_stock)
  VALUES
    (apparel_id, 'Premium Silk Blazer', 'premium-silk-blazer', 'Luxury business wear', 'Tailored silk blazer in black with champagne gold buttons.', 280000, 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 22, true),
    (apparel_id, 'Luxury Cashmere Sweater', 'cashmere-sweater', 'Premium knitwear', '100% pure cashmere sweater in cream with subtle gold threading.', 220000, 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600', 5.0, 18, true),
    (apparel_id, 'Designer Trousers', 'designer-trousers', 'Luxury bottoms', 'Premium tailored trousers in sustainable fabric with gold accents.', 165000, 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 14, true)
  ON CONFLICT (slug) DO NOTHING;
END $$;
