import { useEffect, useState } from "react";
import {
  createEvent,
  deleteEvent,
  getEvents
} from "../services/eventService";

function ManageEvents() {
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    capacity: 100
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data.events || data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEvent(form);

      setForm({
        title: "",
        description: "",
        date: "",
        venue: "",
        capacity: 100
      });

      loadEvents();
      alert("Event created.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to create event"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await deleteEvent(id);
    loadEvents();
  };

  return (
    <section>
      <h1>Manage Events</h1>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          min="1"
          required
        />

        <button type="submit">
          Create Event
        </button>
      </form>

      <div className="grid">
        {events.map((event) => (
          <div className="card" key={event._id}>
            <h3>{event.title}</h3>

            <p>{event.description}</p>

            <button
              className="danger"
              onClick={() =>
                handleDelete(event._id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ManageEvents;