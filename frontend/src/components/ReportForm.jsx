import { useState } from "react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL;

export default function ReportForm() {
  const [form, setForm] = useState({
    ngo_id: "",
    month: "",
    people_helped: "",
    events_conducted: "",
    funds_utilized: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitReport = async () => {
    try {
      await axios.post(`${API_BASE}/report`, form);
      alert("Report submitted successfully");
    } catch {
      alert("Submission failed");
    }
  };

  return (
    <>
      <h2>Submit Monthly Report</h2>

      <div className="form-group">
        <label>NGO ID</label>
        <input name="ngo_id" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Month (YYYY-MM)</label>
        <input name="month" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>People Helped</label>
        <input name="people_helped" type="number" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Events Conducted</label>
        <input name="events_conducted" type="number" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Funds Utilized</label>
        <input name="funds_utilized" type="number" onChange={handleChange} />
      </div>

      <button onClick={submitReport}>Submit Report</button>
    </>
  );
}
