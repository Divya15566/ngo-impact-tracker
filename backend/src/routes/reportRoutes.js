const express = require("express");
const multer = require("multer");
const { submitReport } = require("../controllers/reportController");
const { uploadCSV } = require("../controllers/uploadController");
const { getJobStatus } = require("../controllers/jobController");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/report", submitReport);
router.post("/reports/upload", upload.single("file"), uploadCSV);
router.get("/job-status/:jobId", getJobStatus);
router.get("/dashboard", getDashboardData);

module.exports = router;
