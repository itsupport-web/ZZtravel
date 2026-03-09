const eventList = document.getElementById("eventlist")

eventList.addEventListener('wheel', (e) => {
  e.preventDefault();
  eventList.scrollLeft += e.deltaY;
});

fetch("/events/getall",{
  method: "POST"})
  .then(res => res.json())
  .then(rows => {
    eventList.innerHTML = "";
    if(rows.length == 0){
      document.getElementById("events").innerHTML = "No Events Yet";
      return;
    }
    for(let i = 0; i < 4; i++){
      const event = rows[i];
      const dateArray = formatDateString(event.event_date);
      
      const eventCard = document.createElement("div");
      eventCard.classList.add("flex-column");
      eventCard.style.backgroundImage = `url(/events/getimage?id=${event.image})`;
      eventCard.borderRadius = "10px";
      eventCard.style.width = "40vw";

      const info = document.createElement("div");
      info.classList.add("flex-row");
      info.style.marginTop = "auto";
      info.style.backgroundColor = "white";

      const date = document.createElement("div");
      date.innerHTML = 
      `
        <h1 style = "font-size : 20px">${dateArray[1]}</h1>
        <h1 style = "font-size : 70px ; color :#EC3669">${dateArray[0]}</h1>
        <h1 style = "font-size : 20px">${dateArray[2]}</h1>
      `

      const content = document.createElement("div");
      content.classList.add("flex-column");
      content.innerHTML =
      `
        <h1>${event.title}</h1>
        <p>${event.description}</p>
      `

      info.append(date, content);
      eventCard.appendChild(info);
      eventList.appendChild(eventCard);
    }
});

function formatDateString(dateStr){
  const date = new Date(dateStr);
  const formatted = [date.getDate().toString().padStart(2, "0"),date.toLocaleString("en-US", { month: "short" }).toUpperCase(),date.getFullYear()]

  return formatted;
}