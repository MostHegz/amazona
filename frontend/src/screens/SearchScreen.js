import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Product from '../components/Product';

export default function SearchScreen(props) {
    const {name='all',category='all',pageNumber=1} = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state=>state.productList);
    const {loading, error, products,page,pages} = productList;

    const productCategoryList = useSelector(state=>state.productCategoryList);
    const {loading: loadingCategories, error:errorCategories, categories} = productCategoryList;

    useEffect(()=>{
        dispatch(listProducts({
            pageNumber,
            name: name!=='all'? name:'',
            category: category!=='all'? category:'',

        }))
    },[dispatch,name,category,pageNumber])

    const getFilterUrl = (filter) =>{
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCategory}/name/${filterName}/pageNumber/${filterPage}`;
    }
    return (
        <div>
            <div className='row'>
                {
                loading? <Loading></Loading>
                : error? <Message variant='danger'>{error}</Message>
                : <div>{products.length} Results</div>
                }
                </div>
                    <div className="row top">
                    <div className="col-1">
                        <h3>Category</h3>
                        {
                            loadingCategories? <Loading></Loading>
                            : errorCategories? <Message variant='danger'>{errorCategories}</Message>
                            : 
                            <ul>
                               {
                                   categories.map(categoryInList =>
                                    <li key={categoryInList}>
                                        <Link 
                                            to={getFilterUrl({category:categoryInList})}
                                            className={categoryInList===category? 'active':''}
                                        >{categoryInList}</Link>
                                    </li>
                                    )
                               }
                            </ul>
                        }
                        
                    </div>
                    <div className="col-3">
                        {
                            loading ? <Loading></Loading>
                            : error ? <Message variant="danger">{error}</Message>
                            : (
                            <>
                                {products.length === 0 && (
                                <Message>No Product Found</Message>
                                )}
                                <div className="row center">
                                    {products.map((product) => (
                                        <Product key={product._id} product={product}></Product>
                                    ))}
                                </div>
                                <div className='pagination row center'>
                                    {
                                        [...Array(pages).keys()].map(number=>
                                            <Link 
                                                className={number+1 === page? 'active' : ''}
                                                key={number+1} 
                                                to={getFilterUrl({page: number+1})}
                                            >{number+1}</Link> 
                                            )
                                    }
                                </div>
                            </>
                            )
                        }
                    </div>
                    </div>
                </div>
            
    )
}
