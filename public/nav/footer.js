fetch('/nav/footer.html')
  .then(r => r.text())
  .then((html)=>{ 
    document.body.appendChild(html);
})
