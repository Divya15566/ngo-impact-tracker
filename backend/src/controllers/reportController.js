const db = require("../db/database");

exports.submitReport = (req, res) => {
  const {
    ngo_id,
    month,
    people_helped,
    events_conducted,
    funds_utilized,
  } = req.body;

  if (!ngo_id || !month) {
    return res.status(400).json({ error: "NGO ID and Month are required" });
  }

  const query = `
    INSERT OR REPLACE INTO reports
    (ngo_id, month, people_helped, events_conducted, funds_utilized)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [ngo_id, month, people_helped, events_conducted, funds_utilized],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Report submitted successfully",
      });
    }
  );
};
