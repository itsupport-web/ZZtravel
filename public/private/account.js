console.log("javascript file fetched");
fetch("/users/getAll",{
        method: 'POST'
    })
    .then(res => res.text())
    .then(responseString => {
        document.getElementById("userlist").innerHTML = "testtt";
    });