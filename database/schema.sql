
CREATE DATABASE IF NOT EXISTS momomagic CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE momomagic;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone (phone),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  items JSON NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_id VARCHAR(100) DEFAULT NULL,
  order_status VARCHAR(50) DEFAULT 'placed',
  cancellation_deadline TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_order_id (order_id),
  INDEX idx_user_id (user_id),
  INDEX idx_order_status (order_status),
  INDEX idx_payment_status (payment_status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT DEFAULT NULL,
  price_5pc DECIMAL(10, 2) NOT NULL,
  price_10pc DECIMAL(10, 2) NOT NULL,
  is_veg BOOLEAN DEFAULT TRUE,
  is_available BOOLEAN DEFAULT TRUE,
  stock_level INT DEFAULT 100,
  image_url VARCHAR(255) DEFAULT NULL,
  state ENUM('draft', 'published', 'archived', 'scheduled') DEFAULT 'published',
  scheduled_date TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_is_available (is_available),
  INDEX idx_name (name),
  INDEX idx_state (state),
  INDEX idx_scheduled_date (scheduled_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS catering_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  event_type VARCHAR(50) NOT NULL,
  expected_guests INT NOT NULL,
  preferred_date DATE NOT NULL,
  event_location TEXT NOT NULL,
  package_selected VARCHAR(100) DEFAULT NULL,
  additional_requirements TEXT DEFAULT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_preferred_date (preferred_date),
  INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS franchise_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  current_city VARCHAR(100) NOT NULL,
  preferred_location VARCHAR(100) DEFAULT NULL,
  investment_capacity DECIMAL(12, 2) DEFAULT NULL,
  business_experience TEXT DEFAULT NULL,
  motivation TEXT DEFAULT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_phone (phone),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS career_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  current_city VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  experience VARCHAR(50) DEFAULT NULL,
  expected_salary VARCHAR(50) DEFAULT NULL,
  notice_period VARCHAR(50) DEFAULT NULL,
  motivation TEXT DEFAULT NULL,
  skills TEXT DEFAULT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_position (position),
  INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page VARCHAR(50) NOT NULL,
  section VARCHAR(50) NOT NULL,
  content JSON NOT NULL,
  state ENUM('draft', 'published', 'archived', 'scheduled') DEFAULT 'published',
  scheduled_date TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_page_section (page, section),
  INDEX idx_page (page),
  INDEX idx_state (state),
  INDEX idx_scheduled_date (scheduled_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  recaptcha_score DECIMAL(3,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at DESC),
  INDEX idx_recaptcha_score (recaptcha_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_id VARCHAR(100) UNIQUE NOT NULL,
  order_id VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  phone VARCHAR(15) DEFAULT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  merchant_id VARCHAR(100) DEFAULT NULL,
  key_index INT DEFAULT NULL,
  phonepe_response JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_transaction_id (transaction_id),
  INDEX idx_order_id (order_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  last_login TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO menu_items (name, category, description, price_5pc, price_10pc, is_veg, is_available, stock_level) VALUES
('Veg Momos', 'Steamed', 'Classic steamed vegetable momos with fresh vegetables', 25.00, 50.00, TRUE, TRUE, 100),
('Paneer Momos', 'Steamed', 'Premium paneer momos with cottage cheese filling', 35.00, 70.00, TRUE, TRUE, 100),
('Soya Momos', 'Steamed', 'Protein-rich soya momos with soya chunks', 30.00, 60.00, TRUE, TRUE, 100),
('Cheese Corn Momos', 'Steamed', 'Delicious cheese and corn momos', 50.00, 100.00, TRUE, TRUE, 100),
('Veg Fried Momos', 'Fried', 'Crispy fried vegetable momos', 30.00, 60.00, TRUE, TRUE, 100),
('Paneer Fried Momos', 'Fried', 'Crispy fried paneer momos', 46.00, 80.00, TRUE, TRUE, 100),
('Soya Fried Momos', 'Fried', 'Crispy fried soya momos', 35.00, 70.00, TRUE, TRUE, 100),
('Cheese Corn Fried Momos', 'Fried', 'Crispy fried cheese corn momos', 55.00, 119.00, TRUE, TRUE, 100),
('Kurkure Momos', 'Kurkure', 'Sherghati exclusive crispy kurkure momos', 50.00, 100.00, TRUE, TRUE, 100),
('Paneer Kurkure Momos', 'Kurkure', 'Premium paneer kurkure momos', 60.00, 120.00, TRUE, TRUE, 100),
('Cheese Kurkure Momos', 'Kurkure', 'Cheesy kurkure momos', 60.00, 120.00, TRUE, TRUE, 100),
('Veg Pizza Momos', 'Pizza', 'Fusion pizza-style vegetable momos', 80.00, 160.00, TRUE, TRUE, 100),
('Paneer Pizza Momos', 'Pizza', 'Fusion pizza-style paneer momos', 100.00, 200.00, TRUE, TRUE, 100),
('Soya Pizza Momos', 'Pizza', 'Fusion pizza-style soya momos', 90.00, 180.00, TRUE, TRUE, 100),
('Cheese Corn Pizza Momos', 'Pizza', 'Fusion pizza-style cheese corn momos', 120.00, 240.00, TRUE, TRUE, 100);

INSERT INTO cms_data (page, section, content) VALUES
('home', 'hero', JSON_OBJECT(
  'headline', 'From Humble Stall to Culinary Legend',
  'subheadline', 'Experience the Magic That Transformed Sherghati''s Street Food Scene',
  'ctaText', 'Order Now',
  'ctaLink', '/order/menu'
)),
('home', 'about', JSON_OBJECT(
  'title', 'The Magic Began With a Dream',
  'description', 'In September 2023, a young entrepreneur named Dhruv Gupta decided he''d rather build his own empire than work in someone else''s. Starting with traditional Bihari Pita, he quickly learned that success requires understanding what people truly crave. The pivot to momos wasn''t just a business decision - it was a revelation.'
)),
('contact', 'info', JSON_OBJECT(
  'phone', '+91 9955955191',
  'email', 'info@momomagics.com',
  'address', 'Momo Magic, Naya Bazar, Near Post Office, Sherghati, Bihar 824211',
  'hours', 'Monday-Sunday: 10:00 AM - 10:00 PM'
));

CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_menu_items_category ON menu_items(category, is_available);
CREATE INDEX idx_catering_status_date ON catering_inquiries(status, preferred_date);
CREATE INDEX idx_franchise_status ON franchise_applications(status, created_at DESC);
CREATE INDEX idx_career_status_position ON career_applications(status, position);

CREATE TABLE IF NOT EXISTS page_templates (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  sections LONGTEXT NOT NULL,
  thumbnail VARCHAR(500) DEFAULT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS builder_pages (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  sections LONGTEXT NOT NULL,
  status ENUM('draft', 'published', 'scheduled') DEFAULT 'draft',
  meta_title VARCHAR(200) DEFAULT NULL,
  meta_description TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_updated_at (updated_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ab_tests (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  page_slug VARCHAR(200) NOT NULL,
  traffic_split JSON NOT NULL,
  status ENUM('draft', 'running', 'paused', 'completed') DEFAULT 'draft',
  winner_variant_id VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_page_slug (page_slug),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ab_test_variants (
  id VARCHAR(50) PRIMARY KEY,
  test_id VARCHAR(50) NOT NULL,
  name VARCHAR(200) NOT NULL,
  sections LONGTEXT NOT NULL,
  traffic_percentage INT NOT NULL,
  views INT DEFAULT 0,
  conversions INT DEFAULT 0,
  FOREIGN KEY (test_id) REFERENCES ab_tests(id) ON DELETE CASCADE,
  INDEX idx_test_id (test_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ab_test_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  test_id VARCHAR(50) NOT NULL,
  variant_id VARCHAR(50) NOT NULL,
  metric_type VARCHAR(50) NOT NULL,
  metric_value DECIMAL(10, 2) NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (test_id) REFERENCES ab_tests(id) ON DELETE CASCADE,
  FOREIGN KEY (variant_id) REFERENCES ab_test_variants(id) ON DELETE CASCADE,
  INDEX idx_test_id (test_id),
  INDEX idx_variant_id (variant_id),
  INDEX idx_recorded_at (recorded_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS saved_components (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL,
  component_data LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS content_versions (
  id VARCHAR(50) PRIMARY KEY,
  content_id VARCHAR(100) NOT NULL,
  snapshot LONGTEXT NOT NULL,
  changes JSON DEFAULT NULL,
  description VARCHAR(500) DEFAULT NULL,
  author VARCHAR(100) DEFAULT 'System',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_content_id (content_id),
  INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS performance_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_slug VARCHAR(200) NOT NULL,
  page_load_time INT NOT NULL,
  first_contentful_paint INT NOT NULL,
  largest_contentful_paint INT NOT NULL,
  cumulative_layout_shift DECIMAL(5,3) NOT NULL,
  first_input_delay INT NOT NULL,
  total_blocking_time INT NOT NULL,
  speed_index INT NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_page_slug (page_slug),
  INDEX idx_recorded_at (recorded_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS seo_analysis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_slug VARCHAR(200) NOT NULL,
  score INT NOT NULL,
  title_score INT NOT NULL,
  description_score INT NOT NULL,
  keywords_score INT NOT NULL,
  headings_score INT NOT NULL,
  images_score INT NOT NULL,
  links_score INT NOT NULL,
  mobile_score INT NOT NULL,
  speed_score INT NOT NULL,
  analysis_data JSON NOT NULL,
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_page_slug (page_slug),
  INDEX idx_analyzed_at (analyzed_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
