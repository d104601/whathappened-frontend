import {SyntheticEvent, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NewsSearch from "../services/newsSearch";
import Saved from "../services/saved";


const Subnav = () => {
    // 2 tabs: Search and Saved
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <div>
            <div className="tabs is-centered">
                <ul>
                    <li className={value === 0 ? "is-active" : ""}>
                        <a href='/' onClick={(e) => handleChange(e, 0)}>News Search</a>
                    </li>
                    <li className={value === 1 ? "is-active" : ""}>
                        <a href='/saved' onClick={(e) => handleChange(e, 1)}>Saved Articles</a>
                    </li>
                    <li className={value === 2 ? "is-active" : ""}>
                        <a href='/summarize' onClick={(e) => handleChange(e, 2)}>Summarize with GPT</a>
                    </li>
                </ul>
            </div>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<NewsSearch/>}/>
                        <Route path='/saved' element={<Saved/>}/>
                        <Route path='/summarize' element={<div>Summarize with GPT(Coming soon)</div>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default Subnav;