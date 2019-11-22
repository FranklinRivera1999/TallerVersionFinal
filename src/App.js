import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

//import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import Navigation from './componentes/Navigation';
import Main from './componentes/Main';
import TramitesGeneral from './componentes/TramitesGeneral';

function App() {
  return (
    <Router>
       <Navigation/>
       <div className="container-fluid">
      <Route path="/"  exact component={Main}></Route>
      <Route path="/allTramites" className="py-4" exact component={TramitesGeneral}></Route>
    </div>
    </Router>
  );
}

export default App;
