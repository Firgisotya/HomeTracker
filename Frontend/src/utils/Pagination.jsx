import { React, useState } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <a className="page-link" href="javascript:void(0);" onClick={() => onPageChange(currentPage - 1)}>
              <i className="tf-icon bx bx-chevrons-left" />
            </a>
          </li>
          {pageNumbers.map(page => (
            <li key={page} className={`page-item ${currentPage === page && 'active'}`}>
              <a className="page-link" href="javascript:void(0);" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
            <a className="page-link" href="javascript:void(0);" onClick={() => onPageChange(currentPage + 1)}>
              <i className="tf-icon bx bx-chevrons-right" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
