const navSVG = document.querySelectorAll('.navigationbar svg');
const navButton = document.querySelectorAll('.navigationbar button');
const calendarButton = document.getElementById("calendarbutton");
const navChild =  document.querySelectorAll('.navigationbar > *');
const searchInput = document.getElementById("search");
const searchBar = document.getElementById("searchbar");

sessionStorage.setItem("q", "");
sessionStorage.setItem("startdate", "");
sessionStorage.setItem("enddate", "");
sessionStorage.setItem("status", "");
searchInput.value = sessionStorage.getItem("q");
navChild.forEach((child)=>{
  if (child.id == "searchbar") return;

  child.addEventListener("click",()=>{
    if(child.classList.contains("navhover")){
      child.classList.remove("navhover");
    }else{
      child.classList.add("navhover");
    }
  })
})

searchBar.addEventListener("click",()=>{
  searchBarTrigger();
})

searchBar.addEventListener('focusout', (e) => {
  if (!searchBar.contains(e.relatedTarget)) {
    searchBarUntrigger();
  }
});

fetch("/events/getall",{
  method: "POST"})
  .then(res => res.json())
  .then(rows => {
    showEvents(rows);
});

function searchBarTrigger(){
  searchBar.style.width = "60vw";
  searchBar.style.padding = "0 1%";
  searchInput.style.width = "100%";
}

function searchBarUntrigger(){
  searchBar.style.width = "3vw";
  searchBar.style.padding = "0";
  searchInput.style.width = "0";
}

function filter(){
  const url = "/events/filter?";
  if(sessionStorage.getItem("q") != ""){
    url = url + "q=" + sessionStorage.getItem("q");
  }
  if(sessionStorage.getItem("s") != ""){
    url = url + "&s=" + sessionStorage.getItem("startdate");
  }
  if(sessionStorage.getItem("e") != ""){
    url = url + "&e=" + sessionStorage.getItem("enddate");
  }
  if(sessionStorage.getItem("status") != ""){
    url = url + "&status=" + sessionStorage.getItem("status");
  }
  fetch(url,{method : "GET"})
  .then(res => res.json())
  .then(rows => {
    showEvents(rows)  
  })
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