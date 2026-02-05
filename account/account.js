fetch("/getcurrent")
    .then(res => res.text())
    .then(responseString => {
        document.getElementById("password").value = responseString;
    });