import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router , Link, Route} from 'react-router-dom';
import { listProductCategories } from './actions/productActions';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import Loading from './components/Loading';
import Message from './components/Message';
import SearchBox from './components/SearchBox';
import CartScreen from './screens/CartScreen';
import  HomeScreen from "./screens/HomeScreen";
import OrderHistory from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import  ProductScreen from "./screens/ProductScreen";
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignInScreen from './screens/SignInScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';


function App() {

  const cart = useSelector( state => state.cart);
  const [sidebarIsOpen,setSidebarIsOpen] = useState(false);
  const {cartItems} = cart;
  const userSignin = useSelector(state=> state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();

  const productCategoryList = useSelector(state=>state.productCategoryList);
  const {loading: loadingCategories, error:errorCategories, categories} = productCategoryList;


  const signoutHandler =() =>{
    dispatch(signout())
  };
  useEffect(()=>{
    dispatch(listProductCategories())
  },[dispatch])
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type='button'
              className='open-sidebar'
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className='fa fa-bars'></i>
            </button>
            <Link className="brand" to="/">
              amazonclone
            </Link>
          </div>
          <div>
            <Route 
              render={({history}) => <SearchBox history={history}></SearchBox>}>
            </Route>
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
            {userInfo && userInfo.isAdmin &&(
              <div className='dropdown'>
                <Link to='#admin'>
                  Admin{' '} <i className='fa fa-caret-down' ></i>
                </Link>
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/dashboard'>Dashboard</Link>
                  </li>
                  <li>
                    <Link to='/productlist'>Products</Link>
                  </li>
                  <li>
                    <Link to='/userlist'>Users</Link>
                  </li>
                </ul>
              </div>
            )}          
          </div>
        </header>

        <aside className={sidebarIsOpen ? 'open': ''}>
          <ul className='categories'>
            <li>
              <strong>Categories</strong>
              <button 
                onClick={()=>setSidebarIsOpen(false)}
                className='close-sidebar'
                type='button'
              >
                <i className='fa fa-close'></i>
              </button>
            </li>
            {
              loadingCategories? <Loading></Loading>
                : errorCategories? <Message variant='danger'>{errorCategories}</Message>
                : (
                  categories.map(categoryInList => (
                    <li className={categoryInList}>
                      <Link 
                        to={`/search/category/${categoryInList}`}
                        onClick={()=> setSidebarIsOpen(false)}
                      >
                        {categoryInList}
                      </Link>
                    </li>
                  ))
                )
            }
          </ul>
        </aside>

        <main>

          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path="/product/:id" exact component={ProductScreen}></Route>
          <Route path="/product/:id/edit" exact component={ProductEditScreen}></Route>
          <Route path='/signin' component={SignInScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" exact component={PaymentScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <Route path='/orderhistory' component={OrderHistory}></Route>
          <Route path='/search/name/:name?' exact component={SearchScreen}></Route>
          <Route path='/search/category/:category' exact component={SearchScreen}></Route>
          <Route path='/search/category/:category/name/:name' exact component={SearchScreen}></Route>
          <Route path="/" exact component={HomeScreen}></Route>

          <AdminRoute path='/productlist' component={ProductListScreen}></AdminRoute>
          <AdminRoute path='/userlist' component={UserListScreen}></AdminRoute>
          <AdminRoute path='/user/:id/edit' exact component={UserEditScreen}></AdminRoute>
          </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
    
  );
}

export default App;