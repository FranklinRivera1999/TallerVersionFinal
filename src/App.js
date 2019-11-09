import React from 'react';
import './App.css';

//import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import Navigation from './componentes/Navigation';
import Main from './componentes/Main';


function App() {
  return (
    <div>
      <Navigation/>
    <div className="container-fluid">
      <Main/>
    </div>
    </div>
  );
}

export default App;
