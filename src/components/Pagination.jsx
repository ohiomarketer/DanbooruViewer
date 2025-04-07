
// src/components/Pagination.jsx
import React from "react";
import { Button } from "./ui/Button";

export default function Pagination({ page, setPage }) {
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => p + 1);

  return (
    <div className="pagination">
      <Button onClick={handlePrev} disabled={page === 1}>
        Previous
      </Button>
      <span className="page-number">Page {page}</span>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
}