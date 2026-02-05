fetch("/products")
  .then(res => res.json())
  .then(rows => {
    console.log(rows)
    rows.forEach(product => {
        const el = document.createElement("div");
        el.onclick = () => {
            const url = `./productdetail.html?id=${product.id}&name=${encodeURIComponent(product.name)}&desc=${encodeURIComponent(product.description)}`;
            window.location.href = url;
        };

      el.innerHTML = `
        <p>ID : ${product.id}</p>
        <p>NAME : ${product.name}</p>
        <p>DESCRIPTION : ${product.description}</p>
      `;

      document.getElementById("products").appendChild(el);
    });
  });