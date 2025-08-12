import styles from "@/styles/components/pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const siblingCount = 1; // jumlah halaman di kiri/kanan current page

    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1); // halaman pertama

    // Tambahkan titik-titik setelah halaman pertama jika currentPage terlalu jauh
    if (currentPage > siblingCount + 2) {
      pages.push("●●●");
    }

    // Halaman di sekitar currentPage
    const start = Math.max(2, currentPage - siblingCount);
    const end = Math.min(totalPages - 1, currentPage + siblingCount);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Tambahkan titik-titik sebelum halaman terakhir jika currentPage terlalu jauh
    if (currentPage < totalPages - (siblingCount + 1)) {
      pages.push("●●●");
    }

    pages.push(totalPages); // halaman terakhir

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {page}
          </span>
        )
      )}

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
}
