fetch("/products")
  .then(res => res.json())
  .then(rows => {
    console.log(rows)
    rows.forEach(product => {
      const el = document.createElement("div");

      el.innerHTML = `
        <p>${product.id}</p>
        <p>${product.name}</p>
        <p>${product.description}</p>
      `;

      document.getElementById("products").appendChild(el);
    });
  });
