const eventService = require('../service/events.js');
const path = require('path');

async function getAll(req,res){
  try {
    const events = await eventService.getAll();

    if (!events) {
        return res.send(`
        <script>
            alert('error fetching data');
        </script>
        `);
    }
    res.send(events);
  } catch (err) {
    console.error('Error fetching record:', err);
  }
}

async function getImage(req, res){
  try {

    const file = await eventService.getImage(req.query.id);

    res.set(file.headers);
    file.data.pipe(res);
  } catch (err) {
    console.error("error getting image: ", err);
    res.status(404).send('Image not found');
  };
}

async function updateEvent(req,res){
  try {
    const update = await eventService.updateEvent(req.body.name, req.body.desc, req.body.id);

    if(!update){
      return;
    }

    res.redirect("/events");
  } catch (err) {
    console.error('Error updating record:', err);
  }
}

async function createEvent(req,res){
  try {
    const create = await eventService.createEvent(req.body.name, req.body.desc);
    
    if(!create){
      return;
    }

    res.redirect("/event");
  } catch (err) {
    console.error('Error updating record:', err);
  };
}

async function deleteEvent(req,res){
  try {
    const deleted = await eventService.deleteEvent(req.body.id);
    
    if(!deleted){
      return;
    }

    res.send({ok : deleted});
  } catch (err) {
    console.error('Error updating record:', err);
  };
}

async function filterEvent(req,res){
  try {    
    const filters = {
      title : req.query["q"],
      description : req.query["q"]
    };
    
    let dateArr = [req.query["s"], req.query["e"]];
    let date = [];
    for(let i = 0;i < dateArr.length; i++){
      if(dateArr[i] != undefined){
        date.push(dateArr[i]);
      }
    }
    const results = await eventService.filterEvent(filters,date, req.query["status"]);
    
    if(!results){
      return;
    }

    res.send(results);
  } catch (err) {
    console.error('Error updating record:', err);
  };
}

module.exports = { getAll, updateEvent, createEvent, deleteEvent, filterEvent, getImage};