# WhatHappened

This is a React-based news search application that allows users to search for news articles using a search bar and save their favorite articles to own account.
The application utilizes the Bing News API to fetch the latest news articles based on the user's search query.

## Features

1. **Main page**: The main page of the application displays today's weather, trending news, news categories.
2. **Search**: Users can search for news articles using the search bar. The application will display the top 10 results based on the user's search query.
3. **Article Saving**: After users log in, they can save their favorite articles to account database.
4. **Bing News API**: The application fetches news articles from the Bing News API, providing up-to-date and relevant results to the users.
5. **Backend**: The application uses a backend server to store user information and saved articles. For repository of the backend server, please visit [WhatHappened-Backend](https://github.com/d104601/whathappened-backend).

## Installation

This application is deployed on AWS S3. For deployed version, please visit [here](http://what-happened-frontend.s3-website-us-east-1.amazonaws.com/). <br>
To run the application locally, please follow the steps below:

1. Clone the repository
2. Install dependencies
```
npm install
```
3. Add environment variables
```
REACT_APP_GEOLOCATIONAPI_KEY=<YOUR_GEOLOCATIONAPI_KEY>
REACT_APP_SERVER_URL=<YOUR_BACKEND_URL>
```
4. Run the application
```
npm start
```
5. Open the application in your browser
```
http://localhost:3000
```

## Technologies Used
1. React
2. TypeScript
3. IP Geolocation API
4. Bulma CSS Framework
5. Axios