import React from 'react';
import {Container} from "@mui/material";
import newsSearch from "./services/newsSearch";

function App() {
  return (
      <Container maxWidth={"lg"}>
          <h1>News search</h1>
          <h2>Search and scrap news of local or worldwide.</h2>
          {newsSearch()}
      </Container>
  );
}

export default App;
