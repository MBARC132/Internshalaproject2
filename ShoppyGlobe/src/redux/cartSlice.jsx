import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existing = state.cartItems.find(p => p.id === item.id);
            if(existing){
                existing.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
            localStorage.setItem('cartIems', JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
            localStorage.setItem('cartItem', JSON.stringify(state.cartItems))
        },

    },
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;