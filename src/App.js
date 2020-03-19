import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [token, setState] = useState(null);
  const identity = "phil";

  return (
    <div className="App">
      <header className="App-header">
        <h1>React &amp; Twilio Phone</h1>
      </header>

      <p>Other stuff</p>

      <footer>
        <p>Built on Twitch by <a href="https://twitch.tv/phil_nash">phil_nash</a></p>
      </footer>
    </div>
  );
}



  // handleSubmit(event) {
  //   event.preventDefault();
  //   fetch(`/voice/token?identity=${encodeURIComponent(this.state.name)}`)
  //     .then(response => response.json())
  //     .then(({token}) => this.setState({ ...this.state, token: token }));
  // }


export default App;
