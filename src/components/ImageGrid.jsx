// src/components/ImageGrid.jsx
import React from "react";

export default function ImageGrid({ images }) {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <div key={image.id} className="image-link">
          {image.file_ext === "mp4" ? (
            <video
              className="image-item"
              controls
              muted
              playsInline
              preload="metadata"
              poster={image.preview_file_url}
            >
              <source src={image.file_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={
                image.file_url ||
                image.large_file_url ||
                image.preview_file_url
              }
              alt={image.tag_string}
              className="image-item"
              loading="lazy"
            />
          )}
        </div>
      ))}
    </div>
  );
}