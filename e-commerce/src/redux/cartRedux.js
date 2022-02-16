import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            const product = state.products.filter((item) => {
                if(item._id === action.payload._id && item.color === action.payload.color && item.rom === action.payload.rom){
                    item.quantity += action.payload.quantity;
                    state.total += item.price * action.payload.quantity;
                    return item
                }
                return false;
            })
            if(!(product.length > 0)) {
                state.quantity += 1;
                state.products.push(action.payload);
                state.total += action.payload.price * action.payload.quantity;
            }
        },
        removeProduct: (state, action) => {
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload.index),
            1)
            state.quantity -= 1;
            state.total -= action.payload.price * action.payload.quantity;
        },
        increaseQuantity: (state, action) => {
            state.products.find((item) => {
                if(item._id === action.payload._id && item.color === action.payload.color && item.rom === action.payload.rom){
                    item.quantity += 1;
                    state.total += item.price * 1;
                    return item
                }
                return false;
            })
        },
        decreaseQuantity: (state, action) => {
            state.products.find((item) => {
                if(item._id === action.payload._id && item.color === action.payload.color && item.rom === action.payload.rom){
                    item.quantity -= 1;
                    state.total -= item.price * 1;
                    return item
                }
                return false;
            })
        }
    }
})

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;