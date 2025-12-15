import { useState } from "react";
import axios from "axios";

export default function CsvUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);

  const uploadFile = async () => {
    if (!file) return alert("Please select a CSV file");

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://localhost:5000/reports/upload",
      formData
    );

    pollStatus(res.data.jobId);
  };

  const pollStatus = (jobId) => {
    const interval = setInterval(async () => {
      const res = await axios.get(
        `http://localhost:5000/job-status/${jobId}`
      );
      setStatus(res.data);

      if (res.data.status === "completed") clearInterval(interval);
    }, 1000);
  };

  return (
    <>
      <h2>Bulk CSV Upload</h2>

      <div className="form-group">
        <label>Select CSV File</label>
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <button onClick={uploadFile}>Upload CSV</button>

      {status && (
        <div className="status">
          Processed {status.processed}/{status.total} | Failed: {status.failed}
        </div>
      )}
    </>
  );
}
