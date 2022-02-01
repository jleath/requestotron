import React, { useState } from 'react';
import axios from 'axios';

const URL_REQUEST_URI =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3004' : 'https://requestotron.inspect.joshleath.com';

const App = () => {
  const [ loggingUrl, setLoggingUrl ] = useState('');

  const getLoggerUrl = async (event) => {
    event.preventDefault();
    const response = await axios.get(URL_REQUEST_URI);
    setLoggingUrl(response.data.loggedUrl);
  };

  return (
    <div>
      <form onSubmit={getLoggerUrl}>
        <button type="submit">Get URL</button>
      </form>
      <p>{loggingUrl ? `${URL_REQUEST_URI}/${loggingUrl}` : ''}</p>
      <p>{loggingUrl ? `${URL_REQUEST_URI}/inspect/${loggingUrl}` : ''}</p>
    </div>
  );
};

export default App;
