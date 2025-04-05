import * as sql from 'mssql'

export const sqlConfig: sql.config = {
  user: 'nestjsUser',
  password: 'nestjsPassword123',
  server: 'localhost',
  port: 1433,
  database: 'rh_candidatos',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

// 🔐 Mantém a pool de conexão e evita reconectar desnecessariamente
let cachedPool: sql.ConnectionPool | null = null

export const poolPromise: Promise<sql.ConnectionPool> = (async () => {
  if (cachedPool) return cachedPool

  try {
    const pool = await new sql.ConnectionPool(sqlConfig).connect()
    console.log('✅ Conectado ao SQL Server com sucesso!')
    cachedPool = pool
    return pool
  } catch (err) {
    console.error('❌ Erro ao conectar com SQL Server:', err)
    process.exit(1)
  }
})()
