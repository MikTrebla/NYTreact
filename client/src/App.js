import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SearchForm from './components/SearchForm'
// import Results from './components/Results';
// import Saved from './components/Saved';

const App = () => {
  return (
    <Router>
      <div>
        <SearchForm />
        {/* <Results />
        <Saved /> */}

      </div>
    </Router>
  )
}

export default App;
