import * as sql from 'mssql';

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
};

export const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then(pool => {
    console.log('✅ Conectado ao SQL Server com sucesso!');
    return pool;
  })
  .catch(err => {
    console.error('❌ Erro ao conectar com SQL Server:', err);
    process.exit(1);
  });
