// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
import ImageGrid from "./components/ImageGrid";
import Pagination from "./components/Pagination";

const PER_PAGE = 25;

export default function App() {
  const [tag, setTag] = useState("cute");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formatTags = (input) => {
    return input.replace(/,/g, " ").replace(/\s+/g, " ").trim();
  };

  const fetchImages = async (newPage = page, newTag = tag) => {
    setLoading(true);
    setError(false);

    const formattedTag = formatTags(newTag);
    const encodedTag = encodeURIComponent(formattedTag);

    try {
      const response = await axios.get(
        `https://danbooru.donmai.us/posts.json?tags=${encodedTag}&limit=${PER_PAGE}&page=${newPage}`
      );

      const media = response.data.filter((post) => post.file_url && ["jpg", "png", "gif", "mp4"].includes(post.file_ext));

      if (media.length === 0) {
        const fallback = await axios.get(
          `https://danbooru.donmai.us/posts.json?tags=rating%3Ae&limit=${PER_PAGE}&page=1`
        );
        const fallbackMedia = fallback.data.filter((post) => post.file_url && ["jpg", "png", "gif", "mp4"].includes(post.file_ext));
        setImages(fallbackMedia);
        setError(false);
      } else {
        setImages(media);
      }
    } catch (err) {
      console.error("Error fetching images", err);
      try {
        const fallback = await axios.get(
          `https://danbooru.donmai.us/posts.json?tags=rating%3Ae&limit=${PER_PAGE}&page=1`
        );
        const fallbackMedia = fallback.data.filter((post) => post.file_url && ["jpg", "png", "gif", "mp4"].includes(post.file_ext));
        setImages(fallbackMedia);
        setError(false);
      } catch (fallbackErr) {
        console.error("Fallback also failed", fallbackErr);
        setImages([]);
        setError(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchImages(1, tag);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Danbooru Image Viewer</h1>
      <div className="flex gap-2 mb-4">
        <Input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Search tags (e.g. hatsune_miku swimsuit)"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ImageGrid images={images} />
      )}

      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
