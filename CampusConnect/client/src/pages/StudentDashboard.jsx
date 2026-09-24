import { useAuth } from "../context/AuthContext";

function StudentDashboard() {
  const { user } = useAuth();

  return (
    <section>
      <h1>Student Dashboard</h1>

      <div className="dashboard-card">
        <h2>Welcome, {user?.name}</h2>

        <p>Email: {user?.email}</p>

        <p>Role: Student</p>

        <p>
          Use CampusConnect to explore events,
          register for activities and access learning
          resources.
        </p>
      </div>
    </section>
  );
}

export default StudentDashboard;