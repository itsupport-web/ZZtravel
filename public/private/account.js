const userList = document.getElementById("userlist");
console.log("javascript file fetched");
fetch("/users/getall",{
    method: 'POST'
})
.then(res => res.json())
.then(rows => {
    console.log(rows)
    rows.forEach(users => {
        let el = document.createElement("div");
        el.innerHTML = `
            <tr>
                <td>${users.id}</td>
                <td>${product.name}</td>
                <td>${product.email}</td>
                <td>${product.email}</td>
                <td>${product.contact_number}</td>   
                <td>${product.ic}</td>  
            </tr>
        `;
        userList.appendChild(el);
    })
});