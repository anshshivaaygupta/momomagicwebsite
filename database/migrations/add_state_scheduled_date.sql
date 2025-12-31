
USE momomagic;

ALTER TABLE cms_data 
ADD COLUMN IF NOT EXISTS state ENUM('draft', 'published', 'archived', 'scheduled') DEFAULT 'published' AFTER content,
ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMP NULL DEFAULT NULL AFTER state,
ADD INDEX IF NOT EXISTS idx_state (state),
ADD INDEX IF NOT EXISTS idx_scheduled_date (scheduled_date);

ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS state ENUM('draft', 'published', 'archived', 'scheduled') DEFAULT 'published' AFTER image_url,
ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMP NULL DEFAULT NULL AFTER state,
ADD INDEX IF NOT EXISTS idx_state (state),
ADD INDEX IF NOT EXISTS idx_scheduled_date (scheduled_date);

ALTER TABLE builder_pages 
ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMP NULL DEFAULT NULL AFTER status,
ADD INDEX IF NOT EXISTS idx_scheduled_date (scheduled_date);

UPDATE cms_data SET state = 'published' WHERE state IS NULL;
UPDATE menu_items SET state = 'published' WHERE state IS NULL;
