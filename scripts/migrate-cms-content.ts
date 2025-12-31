import { query } from '../lib/db';

async function runMigration() {
  try {
    console.log('🔄 Creating cms_content table...');
    
    // Create table (PostgreSQL compatible)
    await query(`
      CREATE TABLE IF NOT EXISTS cms_content (
        id SERIAL PRIMARY KEY,
        page_name VARCHAR(100) NOT NULL UNIQUE,
        content_data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Table created successfully!');
    
    // Create indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_cms_content_page_name ON cms_content(page_name)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_cms_content_updated_at ON cms_content(updated_at)`);
    
    console.log('✅ Indexes created successfully!');
    
    // Insert default data for all 11 pages
    const pages = ['hero', 'menu', 'about', 'contact', 'gallery', 'combos', 'catering', 'franchise', 'download-app', 'legal-pages', 'careers'];
    
    for (const page of pages) {
      await query(`
        INSERT INTO cms_content (page_name, content_data)
        VALUES (?, '{}'::jsonb)
        ON CONFLICT (page_name) DO NOTHING
      `, [page]);
    }
    
    console.log('✅ Default data inserted successfully!');
    
    // Verify
    const result = await query('SELECT page_name FROM cms_content ORDER BY page_name');
    console.log(`✅ Total pages in database: ${result.length}`);
    console.log('Pages:', result.map((r: any) => r.page_name).join(', '));
    
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
