import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrPageNo } from '../store/PageDataSlice';

const Page = () => {
  const dispatch = useDispatch();
  
  const totalPages = useSelector((state: any) => state.pageData.totalPages);
  const currPageNo = useSelector((state: any) => state.pageData.currPageNo);

  const [jumpNumber, setJumpNumber] = React.useState(currPageNo);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currPageNo) {
      dispatch(setCurrPageNo(page));
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currPageNo - 2);
    const end = Math.min(totalPages, currPageNo + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-20 p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-wrap justify-center items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Jump to page:</span>
        <input
          type="number"
          value={jumpNumber}
          onChange={(e) => setJumpNumber(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-1 w-20 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          min={1}
          max={totalPages}
        />
        <button
          onClick={() => handlePageChange(jumpNumber)}
          className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600 transition"
        >
          Go
        </button>
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => handlePageChange(currPageNo - 1)}
          disabled={currPageNo === 1}
          className={`px-3 py-1 border rounded-md text-sm transition 
            ${currPageNo === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          «
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md border text-sm transition
              ${page === currPageNo
                ? 'bg-blue-500 text-white border-blue-500'
                : 'text-gray-700 hover:bg-gray-100'}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currPageNo + 1)}
          disabled={currPageNo === totalPages}
          className={`px-3 py-1 border rounded-md text-sm transition 
            ${currPageNo === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          »
        </button>
      </div>

      <div className="text-sm text-gray-600 font-medium">
        Total Pages: <span className="text-blue-600">{totalPages}</span>
      </div>
    </div>
  );
};

export default Page;