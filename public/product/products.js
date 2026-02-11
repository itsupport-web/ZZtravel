fetch("/products/getall",{
  method: "POST"})
  .then(res => res.json())
  .then(rows => {
    console.log(rows)
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
          });
        };
        el.innerHTML = `
          <p>ID : ${product.id}</p>
          <p>NAME : ${product.name}</p>
          <p>DESCRIPTION : ${product.description}</p>
        `;
      document.getElementById("products").appendChild(el);
    });
  });