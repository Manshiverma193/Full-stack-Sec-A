import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <h1>Welcome to CampusConnect</h1>

      <p>
        One platform for students to discover campus
        events, resources and activities.
      </p>

      <div className="hero-buttons">
        <Link to="/events" className="button">
          Explore Events
        </Link>

        <Link to="/resources" className="button secondary">
          View Resources
        </Link>
      </div>
    </section>
  );
}

export default Home;