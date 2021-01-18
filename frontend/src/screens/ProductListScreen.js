import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstant';

export default function ProductListScreen(props) {
    const productList = useSelector(state => state.productList);
    const {loading, error, products}=productList;
    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate, 
        product: createdProduct
    } = productCreate;
    const productDelete = useSelector(state => state.productDelete);
    const{
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = productDelete;
    const dispatch = useDispatch();
    useEffect(()=>{
        if (successCreate) {
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts());
    },[dispatch,createdProduct,props.history,successCreate,successDelete]);

    const deleteHandler =(product) =>{
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(product._id))
        }
    }

    const createHandler =() =>{
        dispatch(createProduct());
    }
    return (
        <div>
            <div className='row'>
                <h1>Products</h1>
                <button type='button' className='primary' onClick={createHandler}>
                    Create Product
                </button>
            </div>
            {loadingCreate && <Loading></Loading>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loadingDelete && <Loading></Loading>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {
                loading ? <Loading></Loading>
                : error 
                ? <Message variant='danger'>{error}</Message>
                : (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <button 
                                                type ='button' 
                                                className='small'
                                                onClick={()=> props.history.push(`/product/${product._id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                type='button' 
                                                className='small'
                                                onClick={()=> deleteHandler(product)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
