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

async function getImage(req, res) {
  try {
    const file = await eventService.getImage(req.query.id);

    if (!file || !file.data) {
      return res.status(404).send('Image not found');
    }

    const contentType = file.type.split(';')[0];
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.removeHeader('ETag');

    // 1️⃣ If file.data is a string → convert to Buffer
    if (typeof file.data === 'string') {
      const buffer = Buffer.from(file.data, 'binary');
      res.send(buffer);

    // 2️⃣ If file.data is a Buffer → send directly
    } else if (Buffer.isBuffer(file.data)) {
      res.send(file.data);

    // 3️⃣ If file.data is a Stream → pipe
    } else if (file.data?.pipe) {
      file.data.pipe(res);

    } else {
      console.error('Unknown file.data type', typeof file.data, file.data?.constructor?.name);
      res.status(500).send('Invalid image data');
    }

  } catch (err) {
    console.error("error getting image: ", err);
    res.status(404).send('Image not found');
  }
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
    const filters = await eventService.filterEvent(req.body.text);
    
    if(!filters){
      return;
    }

    res.send(filters);
  } catch (err) {
    console.error('Error updating record:', err);
  };
}

module.exports = { getAll, updateEvent, createEvent,deleteEvent, filterEvent, getImage};