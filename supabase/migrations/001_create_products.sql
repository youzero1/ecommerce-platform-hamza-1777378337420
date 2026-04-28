-- Run this SQL in your Supabase SQL Editor to create the products table.
-- After running, refresh your schema in the Database panel.

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  image TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  reviews_count INTEGER NOT NULL DEFAULT 0,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read products
CREATE POLICY "products_anon_select" ON products FOR SELECT TO anon USING (true);

-- Seed data
INSERT INTO products (name, description, price, category, rating, reviews_count, in_stock) VALUES
  ('Wireless Noise-Cancelling Headphones', 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio.', 299.99, 'Electronics', 4.8, 1243, true),
  ('Smart Watch Pro', 'Advanced fitness tracking, heart rate monitoring, GPS, and seamless smartphone integration.', 399.99, 'Electronics', 4.6, 892, true),
  ('Organic Cotton T-Shirt', 'Soft, breathable organic cotton t-shirt. Ethically sourced and sustainably produced.', 34.99, 'Clothing', 4.5, 567, true),
  ('Minimalist Desk Lamp', 'Modern LED desk lamp with adjustable brightness and color temperature.', 79.99, 'Home & Garden', 4.7, 334, true),
  ('Yoga Mat Premium', 'Extra-thick, non-slip yoga mat made from eco-friendly materials.', 49.99, 'Sports', 4.9, 1567, true),
  ('Bestseller Novel Collection', 'Curated collection of 5 bestselling novels from award-winning authors.', 59.99, 'Books', 4.4, 223, true),
  ('Luxury Skincare Set', 'Complete skincare routine with cleanser, toner, serum, moisturizer, and SPF.', 129.99, 'Beauty', 4.7, 445, true),
  ('Bluetooth Portable Speaker', 'Compact waterproof speaker with 360-degree sound and 20-hour battery.', 89.99, 'Electronics', 4.5, 778, true),
  ('Denim Jacket Classic', 'Timeless denim jacket with a modern fit. Premium Japanese selvedge denim.', 119.99, 'Clothing', 4.6, 389, true),
  ('Indoor Plant Set', 'Collection of 3 easy-care indoor plants in decorative ceramic pots.', 64.99, 'Home & Garden', 4.3, 198, true),
  ('Running Shoes Ultra', 'Lightweight, responsive running shoes with advanced cushioning technology.', 159.99, 'Sports', 4.8, 923, true),
  ('Wireless Charging Pad', 'Fast wireless charging pad compatible with all Qi-enabled devices.', 29.99, 'Electronics', 4.4, 654, true);
