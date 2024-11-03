/* eslint-disable react/prop-types */
import "./Pagination.css";
const Pagination = ({ totalNoOfITems, pagination, curPage }) => {
  const pageNos = [];
  for (let i = 1; i <= Math.trunc(Math.ceil(totalNoOfITems / 4)); i++) {
    pageNos.push(i);
  }
  const content = pageNos.map((pageNo) => (
    <button
      onClick={pagination.bind(null, pageNo)}
      key={pageNo}
      className={curPage === pageNo ? "pageno clicked" : "pageno"}
    >
      {pageNo}
    </button>
  ));
  return (
    <div className="pagenos">
      <div className="pagenos_holder">{content}</div>
    </div>
  );
};

export default Pagination;
