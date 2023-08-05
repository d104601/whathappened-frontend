interface PaginationBarProps {
    CurrentOffset: number;
    setCurrentOffset: (offset: number) => void;
    TotalResults: number;
}

const PaginationBar = (props: PaginationBarProps) => {
    const {CurrentOffset, setCurrentOffset, TotalResults} = props;

    let maxPage = TotalResults < 100 ? Math.floor(TotalResults / 10) : 10;

    let pageNumbers = [];

    for (let i = 0; i < maxPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <button
                className="pagination-previous"
                onClick={() => {
                    setCurrentOffset(CurrentOffset - 10);
                }}
                disabled={CurrentOffset === 0}
            >
                Previous page
            </button>

            <ul className="pagination-list">
                {pageNumbers.map((pageNumber) => {
                    return (
                        <li key={pageNumber}>
                            <button
                                className={"pagination-link" + (CurrentOffset === pageNumber * 10 ? " is-current" : "")}
                                aria-label={"Goto page " + pageNumber}
                                onClick={() => {
                                    setCurrentOffset(pageNumber * 10);
                                }}
                            >
                                {pageNumber + 1}
                            </button>
                        </li>
                    )
                })}
            </ul>

            <button
                className="pagination-next"
                onClick={() => {
                    setCurrentOffset(CurrentOffset + 10);
                }}
                disabled={CurrentOffset === maxPage * 10}
            >
                Next page
            </button>
        </nav>
    )
}

export default PaginationBar;