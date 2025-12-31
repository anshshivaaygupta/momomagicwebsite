import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: [],
    errors: [],
  };

  try {
    results.tests.push({ step: 'Database connection', status: 'testing' });
    
    const testQuery = await queryOne('SELECT 1 as test');
    results.tests.push({ 
      step: 'Database connection', 
      status: 'success',
      result: testQuery 
    });

    results.tests.push({ step: 'Check cms_content table', status: 'testing' });
    const cmsContent = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['about']
    );
    results.tests.push({ 
      step: 'Check cms_content table', 
      status: cmsContent ? 'success' : 'no_data',
      hasData: !!cmsContent,
      dataType: typeof cmsContent?.content_data
    });

    results.tests.push({ step: 'Check published_content table', status: 'testing' });
    const publishedContent = await queryOne(
      'SELECT id FROM published_content WHERE page_name = ?',
      ['about']
    );
    results.tests.push({ 
      step: 'Check published_content table', 
      status: 'success',
      hasRecord: !!publishedContent
    });

    results.tests.push({ step: 'Test INSERT into published_content', status: 'testing' });
    try {
      await query(
        'INSERT INTO published_content (page_name, content_data) VALUES (?, ?)',
        ['test_page', JSON.stringify({ test: 'data' })]
      );
      results.tests.push({ 
        step: 'Test INSERT into published_content', 
        status: 'success'
      });
      
      await query('DELETE FROM published_content WHERE page_name = ?', ['test_page']);
    } catch (insertError) {
      results.tests.push({ 
        step: 'Test INSERT into published_content', 
        status: 'error',
        error: insertError instanceof Error ? insertError.message : 'Unknown error'
      });
      results.errors.push({
        step: 'INSERT test',
        error: insertError instanceof Error ? insertError.message : 'Unknown error',
        stack: insertError instanceof Error ? insertError.stack : 'No stack'
      });
    }

    results.tests.push({ step: 'Test UPDATE published_content', status: 'testing' });
    try {
      await query(
        'INSERT INTO published_content (page_name, content_data) VALUES (?, ?)',
        ['test_page', JSON.stringify({ test: 'data' })]
      );
      
      await query(
        'UPDATE published_content SET content_data = ?, published_at = CURRENT_TIMESTAMP WHERE page_name = ?',
        [JSON.stringify({ test: 'updated' }), 'test_page']
      );
      
      results.tests.push({ 
        step: 'Test UPDATE published_content', 
        status: 'success'
      });
      
      await query('DELETE FROM published_content WHERE page_name = ?', ['test_page']);
    } catch (updateError) {
      results.tests.push({ 
        step: 'Test UPDATE published_content', 
        status: 'error',
        error: updateError instanceof Error ? updateError.message : 'Unknown error'
      });
      results.errors.push({
        step: 'UPDATE test',
        error: updateError instanceof Error ? updateError.message : 'Unknown error',
        stack: updateError instanceof Error ? updateError.stack : 'No stack'
      });
    }

    results.summary = {
      totalTests: results.tests.length,
      passed: results.tests.filter((t: any) => t.status === 'success').length,
      failed: results.tests.filter((t: any) => t.status === 'error').length,
      errors: results.errors.length
    };

    return NextResponse.json(results);

  } catch (error) {
    results.errors.push({
      step: 'General error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack'
    });

    return NextResponse.json(results, { status: 500 });
  }
}
