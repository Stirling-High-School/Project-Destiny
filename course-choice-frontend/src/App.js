import React from 'react';
import Form from './components/Form';
import Choices from './components/Choices';
import Header from './components/Header';
import Login from './components/LoginHooks';
import Logout from './components/LogoutHooks';
import css from './App.css'

function App() {
  return (
    <div className="m-5">
      <Header />
      <Login />
      <Form />
      <Choices />
    </div>
  );
}

export default App;
