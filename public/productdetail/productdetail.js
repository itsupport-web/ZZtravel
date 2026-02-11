fetch("/products/getproductdetail", {method : "POST"})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if (data.exist) {
      const { id, name, desc } = data.productdetails;
      document.getElementById("ID").innerText = "ID : " + id;
      document.getElementById("id").value = id;
      document.getElementById("name").value = name;
      document.getElementById("desc").value = desc;
      document.getElementById("submitbutton").value = "UPDATE";
      document.getElementById("forms").action = "/products/update";
    } else {
      console.log("falsed");
      fetch("/products/getlatestproductid", { method: "POST" })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          document.getElementById("ID").innerText =
            "ID : " + (response.id + 1);
        });
      document.getElementById("submitbutton").value = "ADD PRODUCT";
      document.getElementById("forms").action = "/products/create";
    }
  });

window.addEventListener("beforeunload", (e) => {

  // Standard way to show confirmation
  e.preventDefault();
  e.returnValue = ""; // Some browsers require this
});

