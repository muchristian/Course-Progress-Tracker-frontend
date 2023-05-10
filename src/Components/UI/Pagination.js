import React from "react";
import _ from "lodash";

function Pagination(props) {
  const { total, pageSize, currPage, onPageChange } = props;

  const pagesCount = Math.ceil(total / pageSize);
  //   if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="pagination-wrap">
      <ul class="pagination mt-4">
        <li className="page-item">
          <a class="page-link" onClick={() => onPageChange(currPage - 1)}>
            Prev
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            class={
              page === currPage ? "page-item active active-dark" : "page-item"
            }
          >
            <a class="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a class="page-link" onClick={() => onPageChange(currPage + 1)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
