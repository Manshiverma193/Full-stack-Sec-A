import { useEffect, useState } from "react";
import {
  createResource,
  deleteResource,
  getResources
} from "../services/resourceService";

function ManageResources() {
  const [resources, setResources] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    fileUrl: ""
  });

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    const data = await getResources();
    setResources(data.resources || data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createResource(form);

    setForm({
      title: "",
      description: "",
      category: "",
      fileUrl: ""
    });

    loadResources();
  };

  const handleDelete = async (id) => {
    await deleteResource(id);
    loadResources();
  };

  return (
    <section>
      <h1>Manage Resources</h1>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        <input
          name="title"
          placeholder="Resource Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="fileUrl"
          placeholder="Resource URL"
          value={form.fileUrl}
          onChange={handleChange}
        />

        <button type="submit">
          Add Resource
        </button>
      </form>

      <div className="grid">
        {resources.map((resource) => (
          <div className="card" key={resource._id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>

            <button
              className="danger"
              onClick={() =>
                handleDelete(resource._id)
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

export default ManageResources;