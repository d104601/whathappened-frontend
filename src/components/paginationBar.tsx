import { useState } from "react";
interface PaginationBarProps {
    CurrentOffset: number;
    setCurrentOffset: (offset: number) => void;
    TotalResults: number;
}

const PaginationBar = (props: PaginationBarProps) => {
    const {CurrentOffset, setCurrentOffset, TotalResults} = props;
    const [currentPage, setCurrentPage] = useState(CurrentOffset / 10);
    const [targetPage, setTargetPage] = useState(currentPage + 1);
    let maxPage = Math.floor(TotalResults / 10);


    // page input with current page
    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <button
                className="pagination-previous"
                onClick={() => {
                    setCurrentOffset(CurrentOffset - 10);
                    setCurrentPage(currentPage - 1);
                    setTargetPage(currentPage);
                }}
                disabled={CurrentOffset === 0}
            >
                Previous page
            </button>

            <ul className="pagination-list">
                <li>
                    <button
                        className="pagination-link"
                        onClick={() => {
                            setCurrentOffset(0);
                            setCurrentPage(0);
                            setTargetPage(1);
                        }
                        }
                        disabled={currentPage === 0}
                    >
                        First page
                    </button>
                </li>
                <li>
                    <input
                        className="pagination-link"
                        type="number"
                        min={1}
                        max={maxPage}
                        value={targetPage}
                        onChange={(e) => {
                            setTargetPage(Number(e.target.value));
                        }}
                        >
                    </input>
                </li>
                <li>
                    <button
                        className="pagination-link"
                        onClick={() => {
                            setCurrentOffset((targetPage-1) * 10);
                            setCurrentPage(targetPage-1);
                            setTargetPage(targetPage);
                        }
                        }
                        disabled={targetPage === currentPage + 1 || targetPage > maxPage}
                    >
                        Move
                    </button>
                </li>
            </ul>

            <button
                className="pagination-next"
                onClick={() => {
                    setCurrentOffset(CurrentOffset + 10);
                    setCurrentPage(currentPage + 1);
                    setTargetPage(currentPage + 2);
                }}
                disabled={CurrentOffset === maxPage * 10}
            >
                Next page
            </button>
        </nav>
    )
}

export default PaginationBar;