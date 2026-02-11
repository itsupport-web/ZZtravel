function ensureLoggedIn(req, res, next) {
  if (req.session?.isLoggedIn) {
    return next(); 
  }
  res.redirect('/signin');
}

module.exports = {ensureLoggedIn}