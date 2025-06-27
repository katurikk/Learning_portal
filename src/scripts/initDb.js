const fs = require('fs');
const path = require('path');
const db = require('../config/database');

// Read schema and seed SQL files
const schema = fs.readFileSync(path.join(__dirname, '../../database/schema.sql'), 'utf8');
const seeds = fs.readFileSync(path.join(__dirname, '../../database/seeds.sql'), 'utf8');

// Execute schema
db.exec(schema, (err) => {
  if (err) {
    console.error('❌ Error executing schema:', err.message);
  } else {
    console.log('✅ Schema applied successfully');

    // Execute seed data
    db.exec(seeds, (err) => {
      if (err) {
        console.error('❌ Error inserting seed data:', err.message);
      } else {
        console.log('✅ Seed data inserted successfully');
      }
    });
  }
});
