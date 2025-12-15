import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:5000/dashboard?month=${month}`
    );
    setData(res.data);
  };

  return (
    <>
      <h2>Admin Dashboard</h2>

      <div className="form-group">
        <label>Select Month (YYYY-MM)</label>
        <input onChange={(e) => setMonth(e.target.value)} />
      </div>

      <button onClick={fetchData}>View Summary</button>

      {data && (
        <div className="stats">
          <div className="stat-box">
            <span>Total NGOs Reporting</span>
            <strong>{data.total_ngos}</strong>
          </div>
          <div className="stat-box">
            <span>People Helped</span>
            <strong>{data.total_people_helped}</strong>
          </div>
          <div className="stat-box">
            <span>Events Conducted</span>
            <strong>{data.total_events_conducted}</strong>
          </div>
          <div className="stat-box">
            <span>Funds Utilized</span>
            <strong>₹{data.total_funds_utilized}</strong>
          </div>
        </div>
      )}
    </>
  );
}
