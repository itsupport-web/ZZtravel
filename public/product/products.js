fetch("/products/getall",{
  method: "POST"})
  .then(res => res.json())
  .then(rows => {
    showProducts(rows);
  });

  document.getElementById("searchbar").addEventListener("input", filter)

  function showProducts(rows){

    document.getElementById("products").innerHTML = "";
    if(rows.length == 0){
      document.getElementById("products").innerHTML = "No Product Found";
      return;
    }
     rows.forEach(product => {
        const el = document.createElement("div");
        el.onclick = () => {
          fetch("/products/setproductdetail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: product.id,
              name: product.name,
              desc: product.description
            })
          }).then(res => res.json()) // parse JSON
            .then(result => {
              if (result === true) {
                window.location.href = "/productdetail";
              }
            });
        };
        el.innerHTML = `
          <p>ID : ${product.id}</p>
          <p>NAME : ${product.name}</p>
          <p>DESCRIPTION : ${product.description}</p>
        `;
      document.getElementById("products").appendChild(el);
    });
  }

  function filter(){
    let textValue = document.getElementById("searchbar").value;
    fetch("/products/filterproduct",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text : textValue
      })})
    .then(res => res.json())
    .then((rows)=>{
      rows.forEach((row)=>{
        row.description = row.description.replace(
          new RegExp(`(${textValue})`, "gi"), 
          `<span style="background-color: yellw;">$1</span>`
        );
        row.name = row.name.replace(
          new RegExp(`(${textValue})`, "gi"), 
          `<span style="background-color: yellow;">$1</span>`
        );
      })
      console.log(rows);
      showProducts(rows);
    })
  }