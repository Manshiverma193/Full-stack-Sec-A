import { useEffect, useState } from "react";
import ResourceCard from "../components/ResourceCard";
import Loading from "../components/Loading";
import { getResources } from "../services/resourceService";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await getResources();
      setResources(data.resources || data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section>
      <h1>Learning Resources</h1>

      <div className="grid">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
            />
          ))
        ) : (
          <p>No resources available.</p>
        )}
      </div>
    </section>
  );
}

export default Resources;