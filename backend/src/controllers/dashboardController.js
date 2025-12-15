const db = require("../db/database");

exports.getDashboardData = (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required (YYYY-MM)" });
  }

  const query = `
    SELECT
      COUNT(DISTINCT ngo_id) AS total_ngos,
      SUM(people_helped) AS total_people_helped,
      SUM(events_conducted) AS total_events_conducted,
      SUM(funds_utilized) AS total_funds_utilized
    FROM reports
    WHERE month = ?
  `;

  db.get(query, [month], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      month,
      total_ngos: row.total_ngos || 0,
      total_people_helped: row.total_people_helped || 0,
      total_events_conducted: row.total_events_conducted || 0,
      total_funds_utilized: row.total_funds_utilized || 0,
    });
  });
};
