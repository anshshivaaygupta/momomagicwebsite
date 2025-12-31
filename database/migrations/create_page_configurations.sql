CREATE TABLE IF NOT EXISTS page_configurations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL UNIQUE,
  sections_config JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_page_name (page_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO page_configurations (page_name, sections_config) VALUES
('homepage', '[]'),
('menu', '[]'),
('about', '[]'),
('contact', '[]'),
('gallery', '[]'),
('combos', '[]'),
('catering', '[]'),
('franchise', '[]'),
('download-app', '[]'),
('legal-pages', '[]'),
('careers', '[]')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
