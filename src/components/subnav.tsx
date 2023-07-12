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
        // <Box sx={{ width: '100%' }}>
        //     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        //         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        //             <Tab label="News Search" {...a11yProps(0)} href='/search' />
        //             <Tab label="Saved Articles" {...a11yProps(1)} href='/saved' />
        //             <Tab label="Summarize with GPT" {...a11yProps(1)} href='/summarize'/>
        //         </Tabs>
        //     </Box>
        //     <Route path='/search'
        //         {newsSearch()}
        //     </Route>
        //     <TabPanel value={value} index={1}>
        //         {Saved()}
        //     </TabPanel>
        //     <TabPanel value={value} index={2}>
        //         Summarize with GPT(Coming soon)
        //     </TabPanel>
        // </Box>
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