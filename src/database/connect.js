const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres.hpomndjulyqrppczgnwt:Supabaseathrotech!234@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres",
  ssl: { rejectUnauthorized: false } // required for Render
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to database. Server time:", res.rows[0].now);
  }
});

module.exports = pool;

