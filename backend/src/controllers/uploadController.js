const fs = require("fs");
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");
const processCSV = require("../jobs/csvProcessor");
const { createJob } = require("../jobs/jobStore");

exports.uploadCSV = (req, res) => {
  const jobId = uuidv4();
  const filePath = req.file.path;

  let totalRows = 0;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", () => totalRows++)
    .on("end", () => {
      createJob(jobId, totalRows);
      processCSV(filePath, jobId);
    });

  res.json({ jobId });
};
