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
            {/* Link to Product Details Page */}
            <Link to={`/product/${product.id}`} className="product-link">
                <img 
                    src={product.thumbnail}  
                    alt={product.title} 
                    className="product-image"
                />
                <h3>{product.title}</h3>
                <p>{product.description.slice(0, 60)}...</p>
            </Link>
            
            {/* Add to Cart Button */}
            <button onClick={handleAddToCart} className="add-btn">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductItem;
