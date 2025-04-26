import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import './App.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                if (!res.ok) throw new Error("Product not Found");
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setSuccessMessage("Item added to the cart!");
        setTimeout(() =>{
            setSuccessMessage('')
        }, 2000);
    };

    if (loading) return <p>Loading Product details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-detail">
            <h2 className="product-title">{product.title}</h2>
            <img
                className="product-image"
                src={product.thumbnail}
                alt={product.title}
            />
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-brand">Brand: {product.brand}</p>
            <p className="product-category">Category: {product.category}</p>
            <button className="detail-btn" onClick={handleAddToCart}>Add to Cart</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default ProductDetail;
