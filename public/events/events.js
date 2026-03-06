fetch("/events/getall",{
  method: "POST"})
  .then(res => res.json())
  .then(rows => {
    showEvents(rows);
});

async function showEvents(rows){
  document.getElementById("events").innerHTML = "";
  if(rows.length == 0){
    document.getElementById("events").innerHTML = "No Events Yet";
    return;
  }
  rows.forEach(async (event) => {
    const dateArray = formatDateString(event.event_date);
    const el = document.createElement("div");
    el.classList.add("event-card");
    el.innerHTML = `
        <div class = "event-image">
          <p class = "event-rotated-text">${event.status}<p>
          <img src="/events/getimage?id=${event.image}">
        </div>
        <div class = "event-content">
          <h1>${event.name}</h1>
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

function formatDateString(dateStr){
  const date = new Date(dateStr);
  const formatted = [date.getDate().toString().padStart(2, "0"),date.toLocaleString("en-US", { month: "short" }).toUpperCase(),date.getFullYear()]

  return formatted;
}