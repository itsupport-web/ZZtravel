const { Pool } = require("pg");

const pool = new Pool({
  host: "dpg-d61fi8ogjchc73fepf70-a",       // e.g., db-abc123.render.com
  port: 5432,
  user: "zzdb_user",
  password: "fvFdggiTgl3Lr0w4DmCoS0KBmjuNfA50",
  database: "zzdb",
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