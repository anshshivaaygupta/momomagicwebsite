
SELECT 
    'Checking if page_configurations table exists...' AS status;

SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN '✓ Table exists'
        ELSE '✗ Table does not exist - Run create_page_configurations.sql'
    END AS result
FROM information_schema.tables 
WHERE table_schema = DATABASE() 
AND table_name = 'page_configurations';

SELECT 
    'Checking table structure...' AS status;

DESCRIBE page_configurations;

SELECT 
    'Checking if all 11 CMS pages are configured...' AS status;

SELECT 
    COUNT(*) as total_pages,
    CASE 
        WHEN COUNT(*) = 11 THEN '✓ All 11 pages configured'
        ELSE CONCAT('✗ Only ', COUNT(*), ' pages configured - Expected 11')
    END AS result
FROM page_configurations;

SELECT 
    'List of configured pages:' AS status;

SELECT 
    id,
    page_name,
    created_at,
    updated_at
FROM page_configurations
ORDER BY id;

SELECT 
    'Checking for pages with custom configurations...' AS status;

SELECT 
    page_name,
    CASE 
        WHEN sections_config = '[]' THEN 'Default (no customization)'
        ELSE 'Customized'
    END AS configuration_status,
    LENGTH(sections_config) as config_size_bytes
FROM page_configurations
ORDER BY page_name;

SELECT 
    'Verifying JSON structure...' AS status;

SELECT 
    page_name,
    CASE 
        WHEN JSON_VALID(sections_config) THEN '✓ Valid JSON'
        ELSE '✗ Invalid JSON'
    END AS json_status
FROM page_configurations;

SELECT 
    'Database Verification Summary' AS status;

SELECT 
    'Total Pages' AS metric,
    COUNT(*) AS value
FROM page_configurations
UNION ALL
SELECT 
    'Pages with Custom Config' AS metric,
    COUNT(*) AS value
FROM page_configurations
WHERE sections_config != '[]'
UNION ALL
SELECT 
    'Pages with Default Config' AS metric,
    COUNT(*) AS value
FROM page_configurations
WHERE sections_config = '[]';

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM page_configurations) = 11 
        THEN '✓ DATABASE VERIFICATION PASSED - All 11 CMS pages are configured'
        ELSE '✗ DATABASE VERIFICATION FAILED - Missing pages or configuration issues'
    END AS final_status;
