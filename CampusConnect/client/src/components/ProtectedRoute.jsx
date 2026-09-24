import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        CampusConnect
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/resources">Resources</Link>

        {user && user.role === "student" && (
          <Link to="/student-dashboard">Dashboard</Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin-dashboard">Admin</Link>
        )}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="nav-button">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="user-name">
              {user.name}
            </span>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;