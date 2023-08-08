import 'bulma/css/bulma.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewsSearch from "./components/newsSearch";
import Saved from "./services/saved";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import Main from "./components/main";
import Footer from './components/footer';

function App() {
    return (
        <div>
            <Navbar/>
            <div className='container'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Main/>}/>
                        <Route path='/search' element={<NewsSearch/>}/>
                        <Route path='/saved' element={<Saved/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/signup' element={<Signup/>}/>
                        <Route path='*' element={<div>Page not found or still working on</div>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
