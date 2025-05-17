import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import './App.css';
import { Link } from 'react-router-dom';
function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity }));
    }

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )
    return (
        <>
         <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your Cart is Empty</p>
            ) : (
            <div>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <img src={item.thumbnail} alt={item.name} className="cart-item-image" />
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity:
                                <input type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} />
                            </p>
                            <button className='Cart-btn' onClick={() => handleRemove(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <h4>Total: ${totalAmount.toFixed(2)}</h4>
                <button className='Checkout-btn'>Proceed to Checkout</button>
            </div>
            )}
            <button><Link to="/">Home</Link></button>
         </div>
        </>
    )
}

export default Cart;
