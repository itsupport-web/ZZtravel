const userService = require('../service/users.js');
const path = require('path');

async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await userService.loginUser(username, password);

  if (!user) {
    return res.send(`
      <script>
        alert('Invalid username or password');
        window.location.href = '/public/signin/index.html';
      </script>
    `);
  }

  req.session.user = user;
  req.session.isLoggedIn = true;
  res.redirect("/users/admin");
}

async function sendAdmin(req, res) {
    res.sendFile(path.join(__dirname, '../../private/index.html'));
}

module.exports = { loginUser, sendAdmin };
