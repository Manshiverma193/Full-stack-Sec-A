function ResourceCard({ resource }) {
  return (
    <div className="card">
      <h3>{resource.title}</h3>

      <p>{resource.description}</p>

      <p>
        <strong>Category:</strong> {resource.category}
      </p>

      {resource.fileUrl && (
        <a
          href={resource.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="button"
        >
          Open Resource
        </a>
      )}
    </div>
  );
}

export default ResourceCard;