fetch('/nav/navbar.html')
  .then(r => r.text())
  .then(html => {
    document.body.insertBefore(html, document.body.firstChild);
  })
