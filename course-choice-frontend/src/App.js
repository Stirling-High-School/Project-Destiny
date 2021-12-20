import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Home />} />
        {/* <Route path="/:id" children={<Page />} /> */}
        {/* <Route exact component={() => <NotFound />} /> */}
      </Switch>
    </Router>
  );
}

export default App;
