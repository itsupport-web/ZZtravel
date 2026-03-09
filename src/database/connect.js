const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "AbCde!234",
  host: "db.hpomndjulyqrppczgnwt.supabase.co", // IPv4 address
  database: "postgres",
  port: 5432,
  ssl: { rejectUnauthorized: false }
}); 


pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to database. Server time:", res.rows[0].now);
  }
});

module.exports = pool;

