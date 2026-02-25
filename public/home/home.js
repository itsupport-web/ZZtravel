const eventList = document.getElementById("eventlist")

eventList.addEventListener('wheel', (e) => {
  e.preventDefault();
  eventList.scrollLeft += e.deltaY;
});