import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import './App.css';

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="product-item">
            <Link to={`/products/${product._id}`} className="product-link">
                <img 
                    src={product.image}  
                    alt={product.title} 
                    className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.description.length > 60 ? product.description.slice(0, 60) + "..." : product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
            </Link>
            
            <button onClick={handleAddToCart} className="add-btn">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductItem;
