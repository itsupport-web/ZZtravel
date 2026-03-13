const navSVG = document.querySelectorAll('.navigationbar svg');
const navButton = document.querySelectorAll('.navigationbar button');
const calendarButton = document.getElementById("calendarbutton");
const navChild =  document.querySelectorAll('.navigationbar > *');
const searchInput = document.getElementById("search");
const searchBar = document.getElementById("searchbar");
const dateInput = document.getElementById("date");
const dateBar = document.getElementById("datebar");
let debounceTimer;

searchInput.value = sessionStorage.getItem("q");

if(sessionStorage.getItem("status") == null){
  sessionStorage.setItem("status","");
}
if(sessionStorage.getItem("q") == null){
  sessionStorage.setItem("q","");
}
if(sessionStorage.getItem("s") == null){
  sessionStorage.setItem("s","");
}
if(sessionStorage.getItem("e") == null){
  sessionStorage.setItem("e","");
}
navChild.forEach((child)=>{
  if (child.id == "searchbar") return;
  if (child.id == "datebar") return;
  child.addEventListener("click",()=>{
    if(child.classList.contains("navhover")){
      child.classList.remove("navhover");
      sessionStorage.setItem("status", "");
    }else{
      navChild.forEach((children)=>{
        children.classList.remove("navhover");
      })
      child.classList.add("navhover");
      sessionStorage.setItem("status", child.dataset.type);
    }
    filter();
  })
})

searchInput.addEventListener("input", ()=>{
  sessionStorage.setItem("q", searchInput.value.trim());
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    filter();
  }, 300); 
})

searchBar.addEventListener("click",()=>{
  triggerBars(searchBar, searchInput, "60vw", "100%", "0 1%");
})

searchBar.addEventListener('focusout', (e) => {
  if (!searchBar.contains(e.relatedTarget)) {
  triggerBars(searchBar, searchInput, "3vw", "0", "0");
  }
});

dateBar.addEventListener("click",()=>{
  triggerBars(dateBar, dateInput, "250px", "100%", "0 1%"); 
})

dateBar.addEventListener('focusout', (e) => {
  const calendar = document.querySelector(".flatpickr-calendar");
  if (!searchBar.contains(e.relatedTarget) && !(calendar && calendar.contains(e.relatedTarget))) {
    triggerBars(dateBar, dateInput, "3vw", "0", "0"); 
  }
});

fetch("/events/getall",{
  method: "POST"})
  .then(res => res.json())
  .then(rows => {
    showEvents(rows);
});

function triggerBars(parent,child, pw, cw, padding){
  parent.style.width = pw;
  parent.style.padding = padding;
  child.style.width = cw;
}

function filter(){
  let url = "/events/filter?";
  if(sessionStorage.getItem("q") != ""){
    url = url + "q=" + sessionStorage.getItem("q");
  }
  if(sessionStorage.getItem("s") != ""){
    if(url[url.length-1] != "?"){
      url = url + "&";
    }
    url = url + "s=" + sessionStorage.getItem("s");
  }
  if(sessionStorage.getItem("e") != ""){
    if(url[url.length-1] != "?"){
      url = url + "&";
    }
    url = url + "e=" + sessionStorage.getItem("e");
  }
  if(sessionStorage.getItem("status") != ""){
    if(url[url.length-1] != "?"){
      url = url + "&";
    }
    url = url + "status=" + sessionStorage.getItem("status");
  }
  console.log(url);
  /*fetch(url,{method : "GET"})
  .then(res => res.json())
  .then(rows => {
    showEvents(rows)  
  })*/
}
async function showEvents(rows){
  document.getElementById("events").innerHTML = "";
  if(rows.length == 0){
    document.getElementById("events").innerHTML = "No Events Yet";
    return;
  }
  rows.forEach(async (event) => {
    const dateArray = formatDateString(event.event_date);
    const imageSource = await requestImage(event.image);
    const el = document.createElement("div");
    el.classList.add("event-card");
    el.innerHTML = `
        <div class = "event-image">
          <p class = "event-rotated-text">${event.status}<p>
          <img src = "${imageSource}">
        </div>
        <div class = "event-content">
          <h1${event.title}</h1>
          <p>${event.description}</p>
        </div>
        <div class = "event-date">
          <h1 style = "font-size : 20px">${dateArray[0]}</h1>
          <h1 style = "font-size : 70px ; color :#EC3669">${dateArray[1]}</h1>
          <h1 style = "font-size : 20px">${dateArray[2]}</h1>
        </div>
      `;
    document.getElementById("events").appendChild(el);
  });
}


async function requestImage(id){
  fetch("/events/getimage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: {fileId : JSON.stringify({ id })}
    });
}

function formatDateString(dateStr){
  const date = new Date(dateStr);
  const formatted = [date.getDate().toString().padStart(2, "0"),date.toLocaleString("en-US", { month: "short" }).toUpperCase(),date.getFullYear()]

  return formatted;
}

flatpickr("#datebar", {
  mode: "range",
  dateFormat: "Y-m-d",
  onChange: function(selectedDates, dateStr, instance) {
    let textContent = "";
    switch(selectedDates.length){
      case 0 :
        textContent = "No Dates Selected";
        break;
      case 1 :
        textContent = "At " + dateStr;
        break;
      case 2 :
        textContent = dateStr;
        break;  
    }
    dateInput.textContent = textContent;
    sessionStorage.setItem("s", selectedDates[0] ? selectedDates[0].toISOString().slice(0,10) : "");
    sessionStorage.setItem("e", selectedDates[1] ? selectedDates[1].toISOString().slice(0,10) : "");
    console.log(sessionStorage.getItem("e"));
    console.log(sessionStorage.getItem("s"));
    filter();
  }
}); 