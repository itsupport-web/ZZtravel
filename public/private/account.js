const userList = document.getElementById("userlist");

console.log("javascript file fetched");
fetch("/users/getall",{
    method: 'POST'
})
.then(res => res.json())
.then(rows => {
    console.log(rows)
    let table = document.createElement("table");
    rows.forEach(users => {
        let el = document.createElement("tr");
        el.innerHTML = `
                <td>${users.id}</td>
                <td>${users.name}</td>
                <td>${users.email}</td>
                <td>${users.contact_number}</td>   
                <td>${users.ic}</td>
        `;
        el.onclick = ()=>{
            
        }
        table.appendChild(el);
    })
    userList.appendChild(table);
});