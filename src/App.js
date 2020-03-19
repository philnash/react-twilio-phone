import React, { useState, useEffect } from 'react';
import './App.css';
import Phone from './Phone'

const App = () => {
  const [token, setToken] = useState(null);
  const identity = "phil";

  useEffect(() => {
    fetch(`/voice/token?identity=${encodeURIComponent(identity)}`)
      .then(response => response.json())
      .then(({token}) => setToken(token));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>React &amp; Twilio Phone</h1>
      </header>

      {token ? <Phone token={token}></Phone> : <p>Loading...</p>}

      <footer>
        <p>Built on Twitch by <a href="https://twitch.tv/phil_nash">phil_nash</a></p>
      </footer>
    </div>
  );
}

export default App;
