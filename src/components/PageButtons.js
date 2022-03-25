import React from "react";
import Button from "./Button";

const PageButtons = ({ totalPages, setPage, currentPage }) => {
  return (
    <>
      {totalPages > 1 && (
        <div>
          {Array.from(Array(totalPages), (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              onClick={() => setPage(p)}
              text={p.toString()}
              variant={currentPage === p ? "page-selected" : "page"}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PageButtons;
