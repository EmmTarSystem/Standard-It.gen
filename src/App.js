import React from 'react';
import './components/app.css';
import Formulaire from './components/Formulaire';
import Footer from './components/Footer';
import Header from './components/Header';


function App() {

  return (
    <div>
      <div className='main'>
        <Header />
        <Formulaire />
      </div>
      
      <Footer />
    </div>
  )
}


export default App;
