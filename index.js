const express = require('express');
const app = express();
const { Pool } = require("pg");
require("dotenv").config();

app.use(express.static("public"));
app.use("/signin", express.static("signin"));
app.use(express.json())

const pool = new Pool({
  host: "dpg-d61fi8ogjchc73fepf70-a",       // e.g., db-abc123.render.com
  port: 5432,
  user: "zzdb_user",
  password: "fvFdggiTgl3Lr0w4DmCoS0KBmjuNfA50",
  database: "zzdb",
  ssl: { rejectUnauthorized: false } // required for Render
});

// Test DB connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to database. Server time:", res.rows[0].now);
  }
});

async function getUsers() {
  const result = await pool.query("SELECT * FROM users;");
  return result.rows;
}

// Add a new user
async function addUser(username, email) {
  const result = await pool.query(
    "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *;",
    [username, email]
  );
  return result.rows[0];
}

app.post("/check",(req,res)=>{
  
})


app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
}); 
