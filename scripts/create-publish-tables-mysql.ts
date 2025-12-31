import { query } from '../lib/db';

async function createPublishTables() {
  try {
    console.log('🔄 Creating published_content table (MySQL)...');
    
    await query(`
      CREATE TABLE IF NOT EXISTS published_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_name VARCHAR(100) NOT NULL UNIQUE,
        content_data JSON NOT NULL,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        published_by VARCHAR(100) DEFAULT 'admin'
      )
    `);
    
    console.log('✅ published_content table created!');
    
    console.log('🔄 Creating content_backups table (MySQL)...');
    
    await query(`
      CREATE TABLE IF NOT EXISTS content_backups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_name VARCHAR(100) NOT NULL,
        content_data JSON NOT NULL,
        backup_type VARCHAR(50) DEFAULT 'auto',
        backup_name VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by VARCHAR(100) DEFAULT 'admin'
      )
    `);
    
    console.log('✅ content_backups table created!');
    
    console.log('🔄 Creating publish_history table (MySQL)...');
    
    await query(`
      CREATE TABLE IF NOT EXISTS publish_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_name VARCHAR(100) NOT NULL,
        action VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'success',
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by VARCHAR(100) DEFAULT 'admin'
      )
    `);
    
    console.log('✅ publish_history table created!');
    
    console.log('🔄 Creating indexes...');
    
    try {
      await query('DROP INDEX idx_backups_page_created ON content_backups');
    } catch (e) {}
    await query('CREATE INDEX idx_backups_page_created ON content_backups(page_name, created_at)');
    
    try {
      await query('DROP INDEX idx_history_page_created ON publish_history');
    } catch (e) {}
    await query('CREATE INDEX idx_history_page_created ON publish_history(page_name, created_at)');
    
    console.log('✅ Indexes created!');
    
    console.log('🎉 All publish system tables created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  }
}

createPublishTables()
  .then(() => {
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
