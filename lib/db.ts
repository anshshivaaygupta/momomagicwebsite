import mysql from 'mysql2/promise';
import { Pool as PgPool } from 'pg';

function getDatabaseConfig() {
  const databaseUrl = process.env.DATABASE_URL;
  console.log(`[getDatabaseConfig] DATABASE_URL present: ${!!databaseUrl}, length: ${databaseUrl?.length || 0}`);
  
  if (databaseUrl) {
    try {
      const url = new URL(databaseUrl);
      const config = {
        type: url.protocol.startsWith('postgres') ? 'postgres' : 'mysql',
        host: url.hostname,
        port: parseInt(url.port || (url.protocol.startsWith('postgres') ? '5432' : '3306')),
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      };
      console.log(`[getDatabaseConfig] Created ${config.type} config for ${config.host}:${config.port}`);
      return config;
    } catch (error) {
      console.error('[getDatabaseConfig] Failed to parse DATABASE_URL:', error);
    }
  }
  
  console.log('[getDatabaseConfig] No DATABASE_URL found, using MySQL defaults');
  return {
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'momomagic',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

let pool: mysql.Pool | PgPool | null = null;
let poolType: string | null = null;

export function getPool(): mysql.Pool | PgPool {
  const dbConfig = getDatabaseConfig();
  
  if (pool && poolType !== dbConfig.type) {
    console.log(`[getPool] Pool type changed from ${poolType} to ${dbConfig.type}, recreating pool`);
    if (poolType === 'postgres') {
      (pool as PgPool).end();
    } else {
      (pool as mysql.Pool).end();
    }
    pool = null;
    poolType = null;
  }
  
  if (pool && poolType === 'mysql' && dbConfig.type === 'postgres') {
    console.log(`[getPool] DATABASE_URL now available, switching from MySQL to PostgreSQL`);
    (pool as mysql.Pool).end();
    pool = null;
    poolType = null;
  }
  
  if (!pool) {
    console.log(`[getPool] Creating new ${dbConfig.type} pool for ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
    if (dbConfig.type === 'postgres') {
      pool = new PgPool({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        max: dbConfig.connectionLimit,
      });
      poolType = 'postgres';
    } else {
      pool = mysql.createPool(dbConfig);
      poolType = 'mysql';
    }
  } else {
    console.log(`[getPool] Using existing ${poolType} pool`);
  }
  return pool;
}

function convertMySQLToPostgres(sql: string): string {
  let index = 1;
  return sql.replace(/\?/g, () => `$${index++}`);
}

export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  const dbConfig = getDatabaseConfig();
  if (dbConfig.type === 'postgres') {
    const pgPool = getPool() as PgPool;
    const client = await pgPool.connect();
    try {
      const pgSql = convertMySQLToPostgres(sql);
      const result = await client.query(pgSql, params);
      return result.rows as T[];
    } finally {
      client.release();
    }
  } else {
    const mysqlPool = getPool() as mysql.Pool;
    const connection = await mysqlPool.getConnection();
    try {
      const [rows] = await connection.execute(sql, params);
      return rows as T[];
    } finally {
      connection.release();
    }
  }
}

export async function queryOne<T = any>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function insert(
  sql: string,
  params?: any[]
): Promise<number> {
  const dbConfig = getDatabaseConfig();
  if (dbConfig.type === 'postgres') {
    const pgPool = getPool() as PgPool;
    const client = await pgPool.connect();
    try {
      const pgSql = convertMySQLToPostgres(sql);
      const result = await client.query(pgSql, params);
      return result.rows[0]?.id || 0;
    } finally {
      client.release();
    }
  } else {
    const mysqlPool = getPool() as mysql.Pool;
    const connection = await mysqlPool.getConnection();
    try {
      const [result] = await connection.execute(sql, params);
      return (result as any).insertId;
    } finally {
      connection.release();
    }
  }
}

export async function update(
  sql: string,
  params?: any[]
): Promise<number> {
  const dbConfig = getDatabaseConfig();
  if (dbConfig.type === 'postgres') {
    const pgPool = getPool() as PgPool;
    const client = await pgPool.connect();
    try {
      const pgSql = convertMySQLToPostgres(sql);
      const result = await client.query(pgSql, params);
      return result.rowCount || 0;
    } finally {
      client.release();
    }
  } else {
    const mysqlPool = getPool() as mysql.Pool;
    const connection = await mysqlPool.getConnection();
    try {
      const [result] = await connection.execute(sql, params);
      return (result as any).affectedRows;
    } finally {
      connection.release();
    }
  }
}

export async function deleteQuery(
  sql: string,
  params?: any[]
): Promise<number> {
  const dbConfig = getDatabaseConfig();
  if (dbConfig.type === 'postgres') {
    const pgPool = getPool() as PgPool;
    const client = await pgPool.connect();
    try {
      const pgSql = convertMySQLToPostgres(sql);
      const result = await client.query(pgSql, params);
      return result.rowCount || 0;
    } finally {
      client.release();
    }
  } else {
    const mysqlPool = getPool() as mysql.Pool;
    const connection = await mysqlPool.getConnection();
    try {
      const [result] = await connection.execute(sql, params);
      return (result as any).affectedRows;
    } finally {
      connection.release();
    }
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const dbConfig = getDatabaseConfig();
    if (dbConfig.type === 'postgres') {
      const pgPool = getPool() as PgPool;
      const client = await pgPool.connect();
      client.release();
      return true;
    } else {
      const mysqlPool = getPool() as mysql.Pool;
      const connection = await mysqlPool.getConnection();
      connection.release();
      return true;
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export async function closePool(): Promise<void> {
  if (pool) {
    const dbConfig = getDatabaseConfig();
    if (dbConfig.type === 'postgres') {
      await (pool as PgPool).end();
    } else {
      await (pool as mysql.Pool).end();
    }
    pool = null;
  }
}
