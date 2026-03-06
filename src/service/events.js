const pool = require('../database/connect.js');
const b2 = require("../database/img.js");

async function getAll() {
  const query = `SELECT * FROM events;`;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error querying events:', err);
    throw err;
  }
}

async function getImage(fileId){
  await b2.authorize();

  try {
    const file = await b2.downloadFileById({ fileId });
    return file.data;

  } catch (err) {
    console.error(err);
  };
}

async function updateEvent(name, desc,date, id){
    const query = `UPDATE events SET name = $1, description = $2, event_date = $3 WHERE id = $4 RETURNING *;`;

    const values = [name, desc, date, id];
    try{
      const result = await pool.query(query, values);
      
      console.log('Updated record:', result.rows[0]);

      return true;
    }catch(err){
      console.error('Error querying events:', err);
      throw err;
    }
}

async function createEvent(name, desc, date){
    const query = `INSERT INTO Events (name, description, event_date) VALUES ($1,$2,$3)`;
    const values = [name, desc, date];
    try{
      const result = await pool.query(query, values);

      console.log('created Event', result.rows[0]);

      return true;
    }catch(err){
      console.error('Error querying event:', err);
      throw err;
    }
}

async function deleteEvent(id){
  const query = `DELETE FROM events where id = $1`;

  const values = [id];
  try{
    const result = await pool.query(query, values);
    if(result){
        console.log("sucessfully deleted event")
        return true;
    }
  }catch(err){
    console.error('Error querying event:', err);
    throw err;
  }
}

async function filterEvent(text){
  const query = `SELECT * FROM Events WHERE name ILIKE $1 OR description ILIKE $1`;

  const values = [`%${text}%`];

  try{
    const result = await pool.query(query, values);

    return result.rows;
  }catch(err){
    console.error('Error querying user:', err);
    throw err;
  }
}
module.exports = { getAll, updateEvent, createEvent, deleteEvent, filterEvent, getImage};