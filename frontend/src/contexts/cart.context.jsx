import { createContext, useEffect, useState } from 'react';

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


export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  // when cartitems changes, display new count
  cartCount: 0
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


  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};