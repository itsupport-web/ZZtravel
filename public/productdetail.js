const params = new URLSearchParams(window.location.search);
if (params.has("id")) {
  const id = params.get("id"); 
  const name = params.get("name");
  const description = params.get("desc");
  document.getElementById("ID").innerText = id;
  document.getElementById("name").value = name;
  document.getElementById("desc").value = description;
} else {
  fetch("/getoneproduct",{
        method: 'POST'
    })
    .then(res => res.json())
    .then(response => {
        document.getElementById("ID").innerText = response.id;
});
}
