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
                <td>${users.name}</td>
                <td>${users.email}</td>
                <td>${users.email}</td>
                <td>${users.contact_number}</td>   
                <td>${users.ic}</td>  
            </tr>
        `;
        userList.appendChild(el);
    })
});