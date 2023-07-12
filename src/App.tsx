import React from 'react';
import Subnav from "./components/subnav";
import 'bulma/css/bulma.css'

function App() {
  return (
      <div className='container is-fluid'>
          <h1>News search</h1>
          <h2>Search and scrap news of local or worldwide.</h2>
          {Subnav()}
      </div>
  );
}

export default App;
