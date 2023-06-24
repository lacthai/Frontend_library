import { useState } from "react";
import "./Pagination.css";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import ProductPreview from "../ProductPreview/ProductPreview";


export default function Pagination({ data, RenderComponent, title, pageLimit, dataLimit, tablePagination, price }) {
    const [pages] = useState(Math.floor(data.length / dataLimit) + 1);
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <>
            {tablePagination ? (
                getPaginatedData().map((data, idx) =>( 
                    <>
                        <RenderComponent key={idx} {...data} /> 
                    </>
                ))
            ) : (
                <div className="dataContainer d-flex justify-content-center flex-wrap text-white">
                    <h1>{title}</h1>

                    {getPaginatedData().map((data, idx) => (
                        <>
                            <RenderComponent key={idx} {...data}/>
                        </>
                    ))}
                </div>
            )}

            {/* show the next and previous buttons */}
            {data.length > dataLimit && (
                <div className="pagination mb-[20px]">
                    <button onClick={goToPreviousPage} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>
                        <BiLeftArrow />
                    </button>
                    {getPaginationGroup().map((item, index) => (
                        <button key={index} onClick={changePage} className={`paginationItem ${currentPage === item ? "active" : ""} dark:bg-cyan-500 bg-indigo-500 shadow-lg dark:shadow-cyan-500/50 shadow-indigo-500/50 border-none`}>
                            <span>{item}</span>
                        </button>
                    ))}
                    <button onClick={goToNextPage} className={`next ${currentPage >= pages ? "disabled" : ""}`}>
                        <BiRightArrow />
                    </button>
                </div>
            )}
        </>
    );
}