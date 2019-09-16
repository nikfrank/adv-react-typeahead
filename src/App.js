import React, { useState } from 'react';
import './App.css';

import Typeahead from './Typeahead';

function App() {

  const [country, setCountry] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <Typeahead value={country} onChange={setCountry}/>
      </header>
    </div>
  );
}

export default App;
