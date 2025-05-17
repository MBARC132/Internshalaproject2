import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
                const res = await fetch(`http://localhost:5000/api/products/${id}`);
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
        const productToAdd = {
            id: product._id,
            name: product.name,
            image: product.image, 
            price: product.price,
            quantity: 1,
        };
        dispatch(addToCart(productToAdd));
        setSuccessMessage("Item added to the cart!");
        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
    };

    if (loading) return <p>Loading Product details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-detail">
            <h2 className="product-title">{product.name}</h2>
            <img
                className="product-image"
                src={product.image}
                alt={product.name}
            />
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-stock">Stock: {product.stock}</p>
            <button className="detail-btn" onClick={handleAddToCart}>Add to Cart</button>
            <Link to="/" className="btn-link">Home</Link>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default ProductDetail;
