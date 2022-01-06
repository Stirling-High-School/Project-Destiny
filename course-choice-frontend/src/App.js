import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Form from './components/Form';
import { toast } from 'react-toastify';
import MessageComponent from './components/reusable/MessageComponent';

function App() {

  toast.configure({
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 6000,
    hideProgressBar: true
  });

  return (
    <div className="my-8 px-4 md:my-10 md:px-12 lg:px-56 h-full">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/404" exact component={() => <MessageComponent message={"404: Page Not Found"} description={"The page you tried to access does not exist."} isError />} />
          <Route path="/:id" children={<Form />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
