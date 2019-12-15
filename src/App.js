import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//import { Router, Route, browserHistory } from 'react-router-3';

import './App.css';

//import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

//import Navigation from './componentes/Navigation';
import Main from './componentes/Main';
import TramitesGeneral from './componentes/TramitesGeneral';

//history={browserHistory}

function App() {
  return (
    <Router className="container-fluid">
      <Route path="/"  exact component={Main}></Route>
      <Route path="/allTramites" className="py-4" exact component={TramitesGeneral}></Route>
    </Router>
  );
}

export default App;
