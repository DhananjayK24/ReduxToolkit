import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';

const initialState = {
    cartItems: cartItems,
    amount: 5,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) =>{
            state.cartItems = [];
        },
        removeItem: (state, action) =>{
            const ItemID = action.payload;
            state.cartItems = state.cartItems.filter((item)=>
                item.id !== ItemID
            )
        },
        increase: (state, {payload})=>{
            const CartItem = state.cartItems.find((item)=>item.id===payload.id);
            CartItem.amount = CartItem.amount + 1; 
        },
        decrease: (state, {payload})=>{
            const CartItem = state.cartItems.find((item)=>item.id===payload.id);
            CartItem.amount = CartItem.amount - 1; 
        },
        calculateTotals: (state)=>{
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((items)=>{
                amount += items.amount;
                total += items.amount * items.price;
            })

            state.amount = amount;
            state.total = total;
        }
    },
});

// console.log(cartSlice);

export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions;

export default cartSlice.reducer;