import {useState, useEffect} from 'react';

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar is-link ${isSticky ? 'is-fixed-top' : ''}`}>
            <div className='container'>
                <div className='navbar-menu'>
                    <div className='navbar-start'>
                        <a className='navbar-item' href='/'>What Happened</a>
                        <a className='navbar-item' href='/search'>News Search</a>
                        <a className='navbar-item' href='/saved'>Saved Articles</a>
                        <a className='navbar-item' href='/summarize'>Summarize</a>
                    </div>
                    <div className='navbar-end'>
                        <div className='navbar-item'>
                            <div className='buttons'>
                                <a className='button is-primary' href='/signup'>
                                    <strong>Sign up</strong>
                                </a>
                                <a className='button is-light' href='/login'>
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;