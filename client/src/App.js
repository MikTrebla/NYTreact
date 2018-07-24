import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SearchForm from './components/SearchForm'
import Saved from './components/Saved';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path = '/' component = {SearchForm} />
        <Route  exact path = '/saved'component = {Saved} />
      </div>
    </Router>
  )
}

export default App;
