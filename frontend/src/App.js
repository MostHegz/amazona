import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router , Link, Route} from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import  HomeScreen from "./screens/HomeScreen";
import OrderHistory from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import  ProductScreen from "./screens/ProductScreen";
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignInScreen from './screens/SignInScreen';


function App() {

  const cart = useSelector( state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state=> state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();

  const signoutHandler =() =>{
    dispatch(signout())
  }
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              souqclone
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length >0 &&(
                <span className='badge'>{cartItems.length}</span>
              )}
            </Link>
            {
              userInfo ? (
                <div className='dropdown'> 
                  <Link to='#'>
                    {userInfo.name} 
                    <i className='fa fa-caret-down'></i> 
                  </Link>
                  <ul className='dropdown-content'>
                    <li>
                      <Link to='/orderhistory'>Order History</Link>
                    </li>
                    <li>
                      <Link to='#signout' onClick={signoutHandler}> Sign out</Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )
            }            
          </div>
        </header>
        <main>

          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path="/product/:id" exact component={ProductScreen}></Route>
          <Route path='/signin' component={SignInScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" exact component={PaymentScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <Route path='/orderhistory' component={OrderHistory}></Route>
          <Route path="/" exact component={HomeScreen}></Route>
          
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
    
  );
}

export default App;