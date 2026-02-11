fetch("/getproductdetail")
  .then(res => res.json())
  .then(data => {
    if (data.exist) {
      const { id, name, desc } = data.productdetails;
      document.getElementById("ID").innerText = "ID : " + id;
      document.getElementById("id").value = id;
      document.getElementById("name").value = name;
      document.getElementById("desc").value = desc;
      document.getElementById("submitbutton").value = "UPDATE";
      document.getElementById("forms").action = "/change";
    } else {
      fetch("/getoneproduct", { method: "POST" })
        .then(res => res.json())
        .then(response => {
          document.getElementById("ID").innerText =
            "ID : " + (response.id + 1);
        });
      document.getElementById("submitbutton").value = "ADD PRODUCT";
      document.getElementById("forms").action = "/add";
    }
  });

