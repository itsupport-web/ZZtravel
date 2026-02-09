
async function getUser(name, password) {
  // Use parameterized query to prevent SQL injection
  let query = ``;
  let values;
  if(name && password){
    query = `SELECT * FROM users WHERE name = $1 AND password = $2`;
    values = [name, password];
  }else{
    values = [name];
    query = `SELECT * FROM users WHERE name = $1`
  }

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    console.error('Error querying user:', err);
    throw err;
  }
}