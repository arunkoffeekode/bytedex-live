import { lastIndexOf } from "lodash";
import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const { t } = useTranslation();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <span
          class="page-link cursor-pointer"
          onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
        >
          <li class="page-item">
            {currentPage > 1
              ? `${t("pagination.prev")} ...`
              : t("pagination.prev")}
          </li>
        </span>

        {pageNumbers
          .slice(pageNumbers[currentPage - 4], currentPage + 2)
          .map((number) => (
            <li key={number} className="page-item">
              <span
                onClick={() => paginate(number)}
                className={
                  "page-link cursor-pointer font-monospace " +
                  (currentPage === number ? " current " : "")
                }
              >
                {number}
              </span>
            </li>
          ))}
        <li class="page-item">
          <span
            class="page-link cursor-pointer"
            onClick={() =>
              paginate(
                currentPage === pageNumbers.length
                  ? currentPage
                  : currentPage + 1
              )
            }
          >
            {currentPage > 0 && currentPage < lastIndexOf(pageNumbers)
              ? `...${t("pagination.next")}`
              : t("pagination.next")}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
