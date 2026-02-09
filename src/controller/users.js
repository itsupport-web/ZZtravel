const UserService = require('../service/users.js');

async function login(req, res) {
  const { username, password } = req.body;
  const user = await UserService.loginUser(username, password);

  if (!user) {
    return res.send(`
      <script>
        alert('Invalid username or password');
        window.location.href = '/signin.html';
      </script>
    `);
  }

  req.session.user = user;
  req.session.isLoggedIn = true;
  res.redirect('/account/index');
}

module.exports = { login };
