interface PaginationBarProps {
    CurrentOffset: number;
    setCurrentOffset: (offset: number) => void;
}

const PaginationBar = (props: PaginationBarProps) => {
    const { CurrentOffset, setCurrentOffset } = props;
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
                            <li>
                                <button className={
                                    CurrentOffset === 0 ? "pagination-link is-current" : "pagination-link"
                                    }
                                    onClick={() => {
                                        setCurrentOffset(0);
                                    }}>1</button>
                            </li>
                            {
                                CurrentOffset <=20 &&
                                <>
                                <li>
                                    <button className={
                                        CurrentOffset === 10? "pagination-link is-current" : "pagination-link"
                                        }
                                        onClick={() => {
                                            setCurrentOffset(10);
                                        }}>2</button>
                                </li>
                                <li>
                                    <button className={
                                        CurrentOffset === 20? "pagination-link is-current" : "pagination-link"
                                        }
                                        onClick={() => {
                                            setCurrentOffset(20);
                                        }}>3</button>
                                </li>
                                <li>
                                    <button className={
                                        CurrentOffset === 30? "pagination-link is-current" : "pagination-link"
                                        }
                                        onClick={() => {
                                            setCurrentOffset(30);
                                        }}>4</button>
                                </li>
                                <li><span className="pagination-ellipsis">&hellip;</span></li>
                                </>
                            }
                            {
                                CurrentOffset > 20 && CurrentOffset < 70 &&
                                <>
                                <li><span className="pagination-ellipsis">&hellip;</span></li>
                                <li><button className='pagination-link'
                                    onClick={() => {
                                        setCurrentOffset(CurrentOffset - 10);
                                    }}>{CurrentOffset/10}</button></li>
                                <li><button className='pagination-link is-current'>{CurrentOffset/10+1}</button></li>
                                <li><button className='pagination-link'

                                    onClick={() => {
                                        setCurrentOffset(CurrentOffset + 10);
                                    }}>{CurrentOffset/10+2}</button></li>
                                <li><span className="pagination-ellipsis">&hellip;</span></li>
                                </>
                            }
                            {
                                CurrentOffset >= 70 &&
                                <>
                                <li><span className="pagination-ellipsis">&hellip;</span></li>
                                <li>
                                    <button className={
                                        CurrentOffset === 60? "pagination-link is-current" : "pagination-link"
                                        }
                                        onClick={() => {
                                            setCurrentOffset(60);
                                        }}>7</button>
                                </li>
                                <li>
                                    <button className={
                                        CurrentOffset === 70? "pagination-link is-current" : "pagination-link"
                                        }
                                        onClick={() => {
                                            setCurrentOffset(70);
                                        }}>8</button>
                                </li>
                                <li>
                                    <button className={
                                        CurrentOffset === 80? "pagination-link is-current" : "pagination-link"
                                        }
                                        onClick={() => {
                                            setCurrentOffset(80);
                                        }}>9</button>
                                </li>
                                </>
                            }
                            <li>
                                <button className={
                                    CurrentOffset === 90? "pagination-link is-current" : "pagination-link"
                                    }
                                    onClick={() => {
                                        setCurrentOffset(90);
                                    }}>10</button>
                            </li>
                        </ul>

                        <button 
                            className="pagination-next"
                            onClick={() => {
                                setCurrentOffset(CurrentOffset + 10);
                            }}
                            disabled={CurrentOffset === 90}
                        >
                            Next page
                        </button>
                    </nav>
    )
}

export default PaginationBar;