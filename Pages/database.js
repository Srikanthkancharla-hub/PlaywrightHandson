const oracledb = require('oracledb');

async function run() {
  let pool;

  try {
    // Create a connection pool
    pool = await oracledb.createPool({
      user: 'ppokerops',
      password: 'ppokerops', // Keep your original password
      connectionString: '10.1.208.22:1521/real',
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0,
      // Other pool properties if needed
    });

    console.log('Connection pool created');

    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log('Successfully connected to Oracle Database');

    const result = await connection.execute(
      `SELECT * FROM t_player_info`,
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('Query results:', result.rows);

    // Release the connection back to the pool
    await connection.close();

  } catch (err) {
    console.error('Error connecting to Oracle Database:', err);
  } finally {
    if (pool) {
      try {
        await pool.close(0); // Close the pool and all its connections
      } catch (err) {
        console.error('Error closing the pool:', err);
      }
    }
  }
}

run();
