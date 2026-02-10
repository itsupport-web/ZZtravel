const loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', e => {
  e.preventDefault(); // stops redirect
  fetch('/users/check', {
    method: 'POST',
    body:"testing"
  })
});

