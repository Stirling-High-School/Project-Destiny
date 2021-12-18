import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Choices from './components/Choices';
import Header from './components/Header';
import './App.css'

function App() {
  return (
    <div className="py-8 px-1 md:py-12 md:px-12 lg:py-14 lg:px-48 bg-gray-100">
      <Header />
      <Form />
      <Choices />
    </div>
  );
}

export default App;
