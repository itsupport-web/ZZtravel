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

async function getLatestID(req,res){
  try{
    const ID = await userService.getLatestID();

    if(!ID){
      return;
    }

    res.json(ID);
  }catch (err) {
    console.error('Error updating record:', err);
  }
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
    req.session.editExist = true;
    req.session.customer = {id, name, email, number, ic};
    res.send(true);
}

function sendEditCustomer(req, res){
    res.sendFile(path.join(__dirname, '../../private/customerdetail.html'));
}

function getCustomerDetail(req, res){
    let customerDetail= req.session.customer;
    let edit = req.session.editExist;
    req.session.customer = null;
    req.session.editExist = false;
    res.send({customerDetail, edit});
}

async function updateCustomer(req,res){
  try {
    const update = await userService.updateCustomer(req.body.id, req.body.name, req.body.email, req.body.number, req.body.ic);
    
    if(!update){
      return;
    }

    res.redirect("/product");
  } catch (err) {
    console.error('Error updating record:', err);
  };
}

async function createCustomer(req,res){
  try {
    const create = await userService.createCustomer(req.body.name, req.body.email, req.body.number, req.body.ic);
    
    if(!create){
      return;
    }

    res.redirect("/product");
  } catch (err) {
    console.error('Error updating record:', err);
  };
}

async function deleteCustomer(req,res){
  try {
    const deleted = await userService.deleteCustomer(req.body.id);
    
    if(!deleted){
      return;
    }

    res.redirect("/product");
  } catch (err) {
    console.error('Error updating record:', err);
  };
}
module.exports = { loginUser, sendAdmin, getAll, allowEdit, getCustomerDetail, sendEditCustomer, createCustomer, updateCustomer, deleteCustomer, getLatestID};
