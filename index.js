const express = require('express');
const app = express();
app.use(express.static("public"));
app.use("/signin", express.static("signin"));
app.use(express.json())
app.post("/update", (req, res) => {
  if(req.get('Referrer') == "https://color-catch.glitch.me/"){
  console.log("sent")
  fs.readFile("leaderboard.txt", 'utf8', (err, data) => {
    let datas = data.split("\n")
    datas.forEach((e,i)=>{
      datas[i] = e.split(" | ")[0]
    })
    res.send(datas)
  })
  }else{
     res.send("baka desu yooooooooo")
  }
});
app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
}); 
