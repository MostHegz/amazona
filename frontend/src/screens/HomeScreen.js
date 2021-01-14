import React, { useEffect } from 'react';
// import axios from 'axios';
// import data from './data';
import Product from '../Product';
import Loading from '../Loading';
import Message from '../Message';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            {loading? <Loading></Loading>
            :
            error? <Message variant='danger'>{error}</Message>
                :
                (<div className="row center">
                {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                ))}
                </div>)
            }
        </div>
    )
}

export default HomeScreen;
