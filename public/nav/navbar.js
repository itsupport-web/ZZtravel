fetch('/nav/navbar.html')
  .then(r => r.text())
  .then((html)=>{ 
    document.body.insertAdjacentHTML('afterbegin', html);
    const container = document.getElementById("topbar")
    container.querySelectorAll("script").forEach(oldScript => {
      const newScript = document.createElement("script");

      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }

      document.body.appendChild(newScript);
    });
  }).catch(() => retry())
