document.getElementById("loginForm").addEventListener('submit', e => {
  e.preventDefault(); // stops redirect
  fetch('/users/check', {
    method: 'POST',
    body: new FormData(loginForm)
  })
});

