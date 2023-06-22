import React from 'react';
import {Container} from "@mui/material";
import Subnav from "./components/subnav";

function App() {
  return (
      <Container maxWidth={"lg"}>
          <h1>News search</h1>
          <h2>Search and scrap news of local or worldwide.</h2>
          {Subnav()}
      </Container>
  );
}

export default App;
