import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="card">
      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(event.date).toLocaleDateString()}
      </p>

      <p>
        <strong>Venue:</strong> {event.venue}
      </p>

      <Link to={`/events/${event._id}`} className="button">
        View Details
      </Link>
    </div>
  );
}

export default EventCard;