// import node_modules
import { createContext } from 'react';

// create context object for React Hook
// use for Authentication
const ShoppingContext = createContext({
    cartItems: [],
    handleCartItems: (newCartItems) => {}
});

export default ShoppingContext;