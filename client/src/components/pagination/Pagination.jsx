/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ page, totalPages, currentPage }) => {
  const [visibleRange, setVisibleRange] = useState({ start: 1, end: 10 });

  const pageNumbers = []; // Va a contener el total de páginas
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newPage) => {
    if (newPage >= visibleRange.start && newPage <= visibleRange.end) {
      page(newPage); // Solo cambia la página si está dentro del rango actual.
    } else {
      // Calcula el nuevo rango de páginas visibles cuando se hace clic en << o >>.
      const newStart = Math.max(newPage - 4, 1);
      const newEnd = Math.min(newPage + 5, totalPages);
      setVisibleRange({ start: newStart, end: newEnd });
    }
  };

  return (
    <div className={styles.all_pagination}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        PREV
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(visibleRange.start - 1)}
        disabled={visibleRange.start <= 1}>
        {"<<"}
      </button>
      <div className={styles.cont_pages}>
        {pageNumbers
          .filter(
            (pageNumber) =>
              pageNumber >= visibleRange.start && pageNumber <= visibleRange.end
          )
          .map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={
                pageNumber === currentPage
                  ? styles.buttonActive
                  : styles.button_not_current
              }>
              {pageNumber}
            </button>
          ))}
      </div>
      <button
        className={styles.button}
        onClick={() => handlePageChange(visibleRange.end + 1)}
        disabled={visibleRange.end >= totalPages}>
        {">>"}
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        NEXT
      </button>
    </div>
  );
};

export default Pagination;

//! [NOTA] => Para los botones PREV y NEXT:

//* Es necesario agregar un evento onClick = {() => page()} Aquí ejecutamos la función "actualizadora" de la página en la que estamos.

//* A la función "page" le pasamos en "PREV" la página anterior (currentPage -1) y a "NEXT" le pasamos la siguiente (currentPage + pageNumbers.length)
