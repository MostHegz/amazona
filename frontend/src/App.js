import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import  HomeScreen from "./HomeScreen";
import  ProductScreen from "./ProductScreen";


function App() {
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              amazona
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Route path="/product/:id" exact component={ProductScreen}></Route>
          <Route path="/" exact component={HomeScreen}></Route>
          
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
    
  );
}

export default App;