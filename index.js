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

async function getProducts() {
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

app.post("/getoneproduct",async(req,res)=>{
  let row = await getLatestID();
  res.send(row);
})
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

app.post("/getcurrent", async (req,res)=>{
  if(req.session.isLoggedIn){
    let row = await getUser(req.session.user.username);
    console.log(req.session.user.username)
    if(row.length == 0){
      console.log("wrong")
      return res.send(`
        <script>
          alert('Error Fecthing data');
          window.location.href = '/signin.html';
        </script>
      `);
    }else{
      console.log("correct");
      res.send(row[0].password);
    }
  }
})

app.post("/change", async(req,res)=>{
  try {
    const query = `UPDATE products SET name = $1, description = $2 WHERE id = $3 RETURNING *;`;

    const values = [req.body.name, req.body.desc, req.body.id];

    const result = await pool.query(query, values);

    console.log('Updated record:', result.rows[0]);
  } catch (err) {
    console.error('Error updating record:', err);
  }
  res.redirect('/products.html');
})

app.post("/add", async(req,res)=>{
  try {
    const query = `INSERT INTO products (name, description) VALUES ($1,$2)`;

    const values = [req.body.name, req.body.desc];

    const result = await pool.query(query, values);

    console.log('Updated record:', result.rows[0]);
  } catch (err) {
    console.error('Error updating record:', err);
  }
  res.redirect('/products.html');
})


app.post("/update", async (req,res)=>{
  try {
    const query = `UPDATE users SET password = $1 WHERE name = $2 RETURNING *;`;

    const values = [req.body.password, req.session.user.username];

    const result = await pool.query(query, values);

    console.log('Updated record:', result.rows[0]);
  } catch (err) {
    console.error('Error updating record:', err);
  }
  
  res.redirect('/account/index');
})

app.post("/deletep", async (req,res)=>{
  try {
    const query = `DELETE FROM products WHERE id = $1;`;

    const values = [req.body.id];

    const result = await pool.query(query, values);

    console.log('Updated record:', result.rows[0]);
  } catch (err) {
    console.error('Error updating record:', err);
  }
  
  res.redirect('/account/index');
})

app.get('/account/index', (req, res) => {
  if(req.session.isLoggedIn){
    console.log("sending file");
    res.sendFile(path.join(__dirname,"account","index.html"));
  }
});

//I MAY NEED THIS FUNCTION
function ensureLoggedIn(req, res, next) {
  if (req.session?.isLoggedIn) {
    return next(); 
  }
  res.redirect('/signin.html');
}

app.get('/account/:file', ensureLoggedIn, (req, res) => {
  const file = req.params.file;
  res.sendFile(path.join(__dirname, 'account', file));
});

app.get('/public/:file', ensureLoggedIn, (req, res) => {
  const file = req.params.file;
  res.sendFile(path.join(__dirname, 'public', file));
});

app.get("/products",async (req,res)=>{
  let allproducts = await getProducts();
  res.send(allproducts);
})

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
}); 
