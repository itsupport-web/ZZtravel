const inputs = document.querySelectorAll('input[type="text"]');
const deleteButton = document.getElementById("deletebutton");
const submitbutton = document.getElementById("submitbutton");
let isDirty = false;

inputs.forEach(input => {
  input.addEventListener("input", () => {
    isDirty = true;
  });
});

submitbutton.addEventListener("click",()=>{
  isDirty = false;
})

deleteButton.addEventListener("click", async() => {
  isDirty = false;
  const id = parseInt(document.getElementById("id").value);
  const res = await fetch(`/users/deletecustomer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

  if (res.ok) {
    window.location.href = "/users/admin"; 
  }
});

fetch("/users/getcustomerdetail", {method : "POST"})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if (data.edit) {
      const { id, name, email, number, ic} = data.customerDetail;
      document.getElementById("ID").innerText = "ID : " + id;
      document.getElementById("id").value = id;
      document.getElementById("name").value = name;
      document.getElementById("email").value = email;
      document.getElementById("number").value = number;
      document.getElementById("ic").value = ic;
      document.getElementById("forms").action = "/users/updatecustomer";
      document.getElementById("submitbutton").value = "UPDATE";
    } else {
      console.log("falsed");
      fetch("/users/getlatestcustomerid", { method: "POST" })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          document.getElementById("ID").innerText = "ID : " + (response.id + 1);
        });
      document.getElementById("submitbutton").value = "ADD CUSTOMER";
      document.getElementById("forms").action = "/users/createcustomer";
    }
  });

window.addEventListener("beforeunload", (e) => {
  if(!isDirty) return;
  // Standard way to show confirmation
  e.preventDefault();
  e.returnValue = ""; // Some browsers require this
});


