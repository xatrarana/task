const fs = require('fs');
const { Client } = require('pg'); 

const connectionString = 'postgresql://neondb_owner:npg_3lCTqgjo4cWn@ep-mute-waterfall-a5iini5m-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'; 

const client = new Client({
  connectionString: connectionString,
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
    
    fs.readFile('src/config/setup.sql', 'utf8', (err, sql) => {
      if (err) {
        console.error('Error reading SQL file:', err);
        client.end(); 
        return;
      }


      client.query(sql)
        .then(res => {
          console.log('Database setup completed successfully:', res);
        })
        .catch(error => {
          console.error('Error executing SQL commands:', error);
        })
        .finally(() => {
          client.end(); 
        });
    });
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  });