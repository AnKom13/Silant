import React from 'react'

import Header from './Header';
import Body from './Body'
import Footer from './Footer'

import "../styles/App.css";

function App() {

    return (
        <div className="application">
            <Header /> 
            <Body />
            {<Footer />}
      </div>
    )
  }

export default App;
