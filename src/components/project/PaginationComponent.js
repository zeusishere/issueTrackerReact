import React from "react";
import { Pagination } from "react-bootstrap";
function PaginationComponent({
  itemsPerPage,
  totalItems,
  currentPage,
  totalPages,
}) {
  return (
    <div>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{totalPages}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
