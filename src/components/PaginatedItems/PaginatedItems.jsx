import './PaginatedItems.css';

import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';

// import CardList from '../CardList/CardList';

export default function PaginatedItems({ itemsPerPage, itemsList, setListToDisplay }) {
  // We provide itemsList and start work with it.
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setListToDisplay(itemsList.slice(itemOffset, endOffset));
    // setCurrentItems(itemsList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(itemsList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, itemsList]);

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % itemsList.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  // console.log('currentItems:', currentItems);

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      {/* {currentItems.length !== 0 && <CardList list={currentItems} />} */}
      <ReactPaginate
        nextLabel="вперёд"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="назад"
        pageClassName="pagination__item"
        pageLinkClassName="pagination__link"
        previousClassName="pagination__item"
        previousLinkClassName="pagination__previous"
        nextClassName="pagination__item"
        nextLinkClassName="pagination__next"
        breakLabel="..."
        breakClassName="pagination__item"
        breakLinkClassName="pagination__link"
        containerClassName="pagination"
        activeClassName="pagination__active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(<PaginatedItems itemsPerPage={4} />, document.getElementById('container'));
