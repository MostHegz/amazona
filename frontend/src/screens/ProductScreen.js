import React, {useEffect,useState}from 'react';
// import data from "./data";
import Rating from "../Rating"
import {useDispatch, useSelector} from 'react-redux';
import {detailsProduct} from '../actions/productActions'
import Message from '../Message';
import Loading from '../Loading';

function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [quantity, setQuantity] = useState(1)
    const productDetails = useSelector( state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch,productId])
    const addToCartHandler =()=>{
        props.history.push(`/cart/${productId}?qty=${quantity}`)
    }
    return (
        <div>
            {loading? <Loading></Loading>
            :
            error? <Message variant='danger'>{error}</Message>
                :
                (
                    <div>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    ></Rating>
                                </li>
                                <li>Price: ${product.price}</li>
                                <li>
                                    Description:
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                           <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">${product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div>
                                        {product.countInStock>0
                                            ? <span className="success">In Stock</span>
                                            :<span className="danger">Product out of Stock</span>}
                                        </div>
                                    </div>
                                </li>
                                {
                                    product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Quantity</div>
                                                    <div>
                                                        <select value={quantity} 
                                                        onChange={e=> setQuantity(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()]
                                                                    .map(item=> <option key={item+1} value={item+1}>{item+1}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button onClick={addToCartHandler}
                                                className="primary block"
                                                >Add to Cart</button>
                                            </li>
                                        </>

                                    )
                                }
                            </ul>
                           </div> 
                        </div>
                    </div>
                </div>
                )
            }
        </div>


        
    )
}

export default ProductScreen
