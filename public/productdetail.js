const params = new URLSearchParams(window.location.search);
if (params.has("id")) {
  const id = params.get("id"); 
  const name = params.get("name");
  const description = params.get("desc");
  document.getElementById("ID").innerText = "ID : " + id;
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("desc").value = description;
  document.getElementById("submitbutton").value = "UPDATE"
  document.getElementById("forms").action = "/change"
} else {
  fetch("/getoneproduct",{
        method: 'POST'
    })
    .then(res => res.json())
    .then(response => {
        document.getElementById("ID").innerText = "ID : " + (response.id + 1);
    });
  document.getElementById("submitbutton").value = "ADD PRODUCT"
  document.getElementById("forms").action = "/add"
}


