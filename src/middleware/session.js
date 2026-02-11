function ensureLoggedIn(req, res, next) {
  if (req.session?.isLoggedIn) {
    return next(); 
  }
  res.redirect('../../public/signin');
}

module.exports = {ensureLoggedIn}