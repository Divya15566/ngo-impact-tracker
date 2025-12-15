import ReportForm from "./components/ReportForm";
import CsvUpload from "./components/CsvUpload";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <h1>NGO Impact Tracker</h1>

      <div className="card">
        <ReportForm />
      </div>

      <div className="card">
        <CsvUpload />
      </div>

      <div className="card">
        <Dashboard />
      </div>
    </div>
  );
}
