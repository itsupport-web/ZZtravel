function ensureLoggedIn(req, res, next) {
  if (req.session?.isLoggedIn) {
    return next(); 
  }
  res.redirect('/signin.html');
}

module.exports = {ensureLoggedIn}