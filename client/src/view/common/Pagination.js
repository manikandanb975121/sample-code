import React, { useState, useEffect } from "react";  
import ReactPaginate from 'react-paginate';
// export default function Pagination(props) { 
// 	return (  
//        <div className="container"> 
//                 pagination page
//        </div> 
// 	)
// }


export default function PaginatedItems(props) {  
    
    let itemsPerPage = props.itemsPerPage;
    let items = props.items;
    var totalRecord = props.totalRecord;
    var method = props.method;

    const [itemOffset, setItemOffset] = useState(0); 
    const endOffset = itemOffset + itemsPerPage; 
    const pageCount = Math.ceil(totalRecord / itemsPerPage); 
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % totalRecord; 
      setItemOffset(newOffset);
      method(event.selected); 
    }; 
    return (
      <> 
        <ReactPaginate
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination mygoalspages"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }
