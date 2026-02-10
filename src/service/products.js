const pool = require('../database/connect.js');

async function getAll() {
  let query = `SELECT * FROM products`;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error querying user:', err);
    throw err;
  }
}

async function getLatestID(){
   const query = `SELECT id FROM products ORDER BY id DESC LIMIT 1;`;
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (err) {
      console.error('Error querying user:', err);
      throw err;
    }
}

module.exports = { getAll, getLatestID };