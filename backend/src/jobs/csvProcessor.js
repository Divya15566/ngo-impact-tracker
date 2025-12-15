const fs = require("fs");
const csv = require("csv-parser");
const db = require("../db/database");
const { updateJob } = require("./jobStore");

const normalize = (value) =>
  value?.toString().trim();

const processCSV = (filePath, jobId) => {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      try {
        // Normalize possible header variations
        const ngo_id =
          normalize(row.ngo_id) ||
          normalize(row["NGO ID"]) ||
          normalize(row["ngo id"]);

        const month =
          normalize(row.month) ||
          normalize(row.Month);

        if (!ngo_id || !month) {
          updateJob(jobId, false);
          return;
        }

        const people_helped =
          normalize(row.people_helped) ||
          normalize(row["People Helped"]) ||
          0;

        const events_conducted =
          normalize(row.events_conducted) ||
          normalize(row["Events Conducted"]) ||
          0;

        const funds_utilized =
          normalize(row.funds_utilized) ||
          normalize(row["Funds Utilized"]) ||
          0;

        const query = `
          INSERT OR REPLACE INTO reports
          (ngo_id, month, people_helped, events_conducted, funds_utilized)
          VALUES (?, ?, ?, ?, ?)
        `;

        db.run(query, [
          ngo_id,
          month,
          people_helped,
          events_conducted,
          funds_utilized,
        ]);

        updateJob(jobId, true);
      } catch (err) {
        console.error("CSV row error:", err);
        updateJob(jobId, false);
      }
    })
    .on("end", () => {
      fs.unlinkSync(filePath);
    });
};

module.exports = processCSV;
