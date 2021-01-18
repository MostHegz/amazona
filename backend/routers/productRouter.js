import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import {isAuth, isAdmin} from '../utils.js';

const productRouter = express.Router();





productRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};;
    const categoryFilter = category ? {category} : {};
    const count = await Product.count({ ...nameFilter, ...categoryFilter })
    const products = await Product.find({ ...nameFilter, ...categoryFilter }).skip(pageSize*(page-1)).limit(pageSize);
    res.send({products, page, pages: Math.ceil(count / pageSize)});
}))

productRouter.get('/categories', expressAsyncHandler(async(req,res)=>{
    const categories = await Product.find().distinct('category');
    res.send(categories)
}))

productRouter.get('/seed', expressAsyncHandler(async(req,res)=>{
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}))

productRouter.get('/:id', expressAsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    } else {
        res.status(404).send({message: 'Product not Found'})
    }
}))

productRouter.post('/',isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const product = new Product({
        name: 'sample name' + Date.now(),
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({message: 'Product Created', product: createdProduct});
}));

productRouter.put('/:id',isAuth,isAdmin, expressAsyncHandler( async(req,res) =>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({message: 'Product Updated',product: updatedProduct});
    }else{
        res.status(404).send({message: 'Product not found'})
    }
}))

productRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        const deleteProduct = await product.remove();
        res.send({message: 'Product Deleted', product: deleteProduct});
    }else{
        res.status(404).send({message: 'Product not found'});
    }
}))

export default productRouter;