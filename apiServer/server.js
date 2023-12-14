const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
  });

app.get("/status", (request, response) => {
   const status = {
      "Status": "Running"
   };
   
   response.send(status);
});
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'team_sync',
  password: 'postgres',
  port: 5432, // default PostgreSQL port
});

// api/users end Point is to fetch user records from Database
// if id is given in query params then try to fetch user details with that user id 
// if id is given 
//       matched in DB records return that user record
//     else ..
//         return empty Array []

// if id not given in query param then return all records

app.get('/api/users', async (req, res) => {
  try {
    const { id } = req.query;

    const client = await pool.connect();

    if (id) {
      // Fetch a specific user record based on the provided id
      const result = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
      const user = result.rows[0];

      // Always return an array, either with the user data or as an empty array
      res.json(user ? [user] : []);
    } else {
      // If no id is provided, return all user records
      const result = await client.query('SELECT * FROM users');
      const data = result.rows;
      res.json(data);
    }

    client.release();
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// New POST endpoint for signup
app.post('/api/addMember', async(req, res) => {
    const { firstname, lastname, email, phone, role } = req.body;
  
    console.log('Received JSON payload:', { firstname, lastname, email, phone, role });
  
    // Here you can perform database operations, validation, etc.
   
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO users(firstname, lastname, email, phone, role) VALUES($1,$2,$3,$4,$5) RETURNING *' ;
        const result = await client.query(query, [ firstname, lastname, email, phone, role]);
        const insertedData = result.rows[0];
        client.release();
    
        res.json(insertedData);
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
  });
  // New delete endpoint for user
  app.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id; // Assuming the user provides the ID directly in the URL
  
    try {
      const client = await pool.connect();
      const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
      const result = await client.query(query, [userId]);
  
      if (result.rows.length === 0) {
        // No user found with the specified id
        res.status(404).json({ error: 'User not found' });
      } else {
        const deletedData = result.rows[0];
        client.release();
        res.json(deletedData);
      }
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    // New put endpoint for user
  app.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { firstname, lastname, email, phone, role } = req.body;
  
    try {
      const client = await pool.connect();
      const query = 'UPDATE users SET firstname=$1, lastname=$2, email=$3, phone=$4, role=$5 WHERE user_id=$6 RETURNING *';
      const result = await client.query(query, [firstname, lastname, email, phone, role, userId]);
  
      if (result.rows.length === 0) {
        // No user found with the specified id
        res.status(404).json({ error: 'User not found' });
      } else {
        const updatedData = result.rows[0];
        client.release();
        res.json(updatedData);
      }
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  