console.log("javascript file fetched");
fetch("/getcurrent",{
        method: 'POST'
    })
    .then(res => res.text())
    .then(responseString => {
        document.getElementById("password").value = responseString;
    });