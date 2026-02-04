const express = require('express');
const app = express();
app.use(express.static("public"));
app.use("/signin", express.static("signin"));
app.use(express.json())
app.post("/check", (req, res) => {
  const { username, password } = req.body;
  if(password == process.env.PASSWORD){
    res.sendFile(path.join(__dirname, "admin", "index.html"););
  }
});

app.get("/protected/:file", (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(__dirname, "admin", fileName);
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
}); 
