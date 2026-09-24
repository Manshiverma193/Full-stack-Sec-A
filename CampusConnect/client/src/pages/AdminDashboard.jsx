import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <section>
      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">
        <Link to="/manage-events" className="dashboard-card">
          <h2>Manage Events</h2>
          <p>Create, update and delete campus events.</p>
        </Link>

        <Link
          to="/manage-resources"
          className="dashboard-card"
        >
          <h2>Manage Resources</h2>
          <p>Manage student learning resources.</p>
        </Link>
      </div>
    </section>
  );
}

export default AdminDashboard;