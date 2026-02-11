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

function sendAdmin(req, res) {
    res.sendFile(path.join(__dirname, '../../private/index.html'));
}

async function getAll(req, res){
    const users = await userService.getAll();

    if(!users) return;

    res.send(users);
}

function allowEdit(req,res){
    const { id, name, email, number, ic} = req.body;
    req.session.allowEdit = true;
    req.session.customer = {id, name, email, number, ic};
    res.send(true);
}

function sendEditCustomer(req, res){
    res.sendFile(path.join(__dirname, '../../private/customerdetail.html'));
}

function getCustomerDetail(req, res){
    let customerDetail= req.session.customer;
    let edit = req.session.allowEdit;
    req.session.customer = null;
    req.session.allowEdit = false;
    res.send({customerDetail, edit});
}

module.exports = { loginUser, sendAdmin, getAll, allowEdit, getCustomerDetail, sendEditCustomer };
