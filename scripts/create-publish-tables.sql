
CREATE TABLE IF NOT EXISTS published_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL UNIQUE,
  content_data JSON NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_by VARCHAR(100) DEFAULT 'admin'
);

CREATE TABLE IF NOT EXISTS content_backups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL,
  content_data JSON NOT NULL,
  backup_type VARCHAR(50) DEFAULT 'auto',
  backup_name VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100) DEFAULT 'admin'
);

CREATE TABLE IF NOT EXISTS publish_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'success',
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100) DEFAULT 'admin'
);

CREATE INDEX idx_backups_page_created ON content_backups(page_name, created_at);
CREATE INDEX idx_history_page_created ON publish_history(page_name, created_at);

SELECT 'published_content table created' AS status;
SELECT 'content_backups table created' AS status;
SELECT 'publish_history table created' AS status;
SELECT 'All indexes created' AS status;
SELECT '✅ Migration completed successfully!' AS status;
