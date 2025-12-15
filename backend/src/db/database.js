const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "ngo_reports.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect DB", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ngo_id TEXT NOT NULL,
      month TEXT NOT NULL,
      people_helped INTEGER,
      events_conducted INTEGER,
      funds_utilized REAL,
      UNIQUE(ngo_id, month)
    )
  `);
});

module.exports = db;
