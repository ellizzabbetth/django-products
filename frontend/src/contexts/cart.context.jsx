import { Component, createContext, useEffect, useState } from 'react';

// Always return new array with new object. No mutations.
const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        );

    // If found, increment quantity and return.
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
        );
    }
        
    // return new array with modified cartItems and/or new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

// helper
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  // filter out (remove) those quantities that are equal
  // if the quanities are not equal, then keep the value
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// helper
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,              // expose value to Consumer
  setIsCartOpen: () => {},        // expose setter to Consumer
  cartItems: [],
  addItemToCart: () => {},
  // when cartitems changes, display new count
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(()=> {
    const newCartCount = cartItems.reduceRight((total, cartItem)=> total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    addItemToCart, 
    cartCount,
    removeItemToCart,
    clearItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
// useCart Hook
// const useCart = () => {
//   const context = React.useContext(CartContext);
//   if(context === undefined)
//     throw new Error('useTemplate must be used within Cart Provider');
//   return context;
// }

// export {
//   CartProvider,
//   useCart
// }

// Example of how to use in functional Component, if it is a child in the tree of the Provider
//  import { useCart }

//  const MyFC = () => {
//     const {isCartOpen, setIsCartOpen } = useCart();
//  }