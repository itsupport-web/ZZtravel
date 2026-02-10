const UserService = require('../service/users.js');
const path = require('path');
async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await UserService.loginUser(username, password);

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
  res.sendFile(path.join(__dirname, '../../private/index.html'));
}

module.exports = { loginUser };
