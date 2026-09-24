import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getEventById,
  registerForEvent
} from "../services/eventService";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      const data = await getEventById(id);
      setEvent(data.event || data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      await registerForEvent(id);
      alert("Successfully registered for the event.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  if (!event) return <Loading />;

  return (
    <div className="details-card">
      <h1>{event.title}</h1>

      <p>{event.description}</p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(event.date).toLocaleDateString()}
      </p>

      <p>
        <strong>Venue:</strong> {event.venue}
      </p>

      <p>
        <strong>Available Seats:</strong>{" "}
        {event.capacity}
      </p>

      {user?.role === "student" && (
        <button onClick={handleRegister}>
          Register for Event
        </button>
      )}
    </div>
  );
}

export default EventDetails;