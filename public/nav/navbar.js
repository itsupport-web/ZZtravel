fetch('/nav/navbar.html')
  .then(r => r.text())
  .then((html)=>{ 
    document.body.insertAdjacentHTML('afterbegin', html);
})
