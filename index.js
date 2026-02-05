const express = require('express');
const session = require('express-session');
const app = express();
const { Pool } = require("pg");
require("dotenv").config();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/signin", express.static("signin"));
app.use(express.json())
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));


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

async function getUser(name, password) {
  // Use parameterized query to prevent SQL injection
  const query = `
    SELECT * FROM users
    WHERE name = $1 AND password = $2
  `;

  const values = [name, password];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    console.error('Error querying user:', err);
    throw err;
  }
}

app.post("/check",async (req,res)=>{
  const { username, password } = req.body;

  let row = await getUser(username, password);
  if(row.length == 0){
    
    console.log("no row");
    return res.send(`
      <script>
        alert('Invalid username or password');
        window.location.href = '/signin.html';
      </script>
    `);
  }else{
    
    console.log("has row");
    req.session.user = { username };
    req.session.isLoggedIn = true;
    res.redirect('/account/index');
    console.log("redirected");
  }
})

app.get('/account/index', (req, res) => {
  if(req.session.isLoggedIn){
    console.log("sending file");
    res.sendFile(path.join(__dirname,"account","index.html"));
  }
});


app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
}); 
