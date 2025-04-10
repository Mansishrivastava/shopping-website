// src/App.js
import React, { useState, useEffect } from 'react';
import ProductItem from './components/ProductItem';
import { PRODUCTS, FREE_GIFT, THRESHOLD } from './data';

const productListContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '15px',
  marginBottom: '30px', 
};

const cartSummaryStyle = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '15px',
  marginBottom: '20px',
};

const cartItemsContainer = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '15px',
};

const cartItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #eee',
};

const freeGiftStyle = {
  color: 'green',
  fontWeight: 'bold',
  marginLeft: '10px',
  backgroundColor: '#e0ffe0',
  padding: '5px',
  borderRadius: '5px',
  fontSize: '0.8em',
};

const quantityControlsStyle = {
  display: 'flex',
  alignItems: 'center',
};

const quantityButtonStyle = {
  padding: '5px 10px',
  margin: '0 5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  cursor: 'pointer',
};

function App() {
  const [cart, setCart] = useState([]);
  const [freeGiftAdded, setFreeGiftAdded] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();

  const handleAddToCart = (productToAdd) => {
    const existingItem = cart.find(item => item.product.id === productToAdd.id);

    if (existingItem) {
      setCart(
        cart.map(item =>
          item.product.id === productToAdd.id ? { ...item, quantity: item.quantity + productToAdd.quantity } : item
        )
      );
    } else {
      setCart([...cart, { product: productToAdd, quantity: productToAdd.quantity }]);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setCart(
        cart.map(item =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      handleRemoveFromCart(productId);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  useEffect(() => {
    if (subtotal >= THRESHOLD && !freeGiftAdded) {
      setCart(prevCart => [...prevCart, { product: FREE_GIFT, quantity: 1 }]);
      setFreeGiftAdded(true);
      alert(`Congratulations! A free ${FREE_GIFT.name} has been added to your cart.`);
    } else if (subtotal < THRESHOLD && freeGiftAdded) {
      setCart(prevCart => prevCart.filter(item => item.product.id !== FREE_GIFT.id));
      setFreeGiftAdded(false);
    }
  }, [subtotal, freeGiftAdded]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Shopping Cart</h1>
      <section>
        <h2>Products</h2>
        <div style={productListContainer}>
          {PRODUCTS.map(product => (
            <ProductItem key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      <section>
        <h2>Cart Summary</h2>
        <div style={cartSummaryStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <strong>Subtotal:</strong>
            <span>₹{subtotal.toFixed(0)}</span> {}
          </div>
         <hr></hr>
          {freeGiftAdded && <p>You got a free {FREE_GIFT.name}!</p>}
        </div>
      </section>

      <section>
        <h2>Cart Items</h2>
        <div style={cartItemsContainer}>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map(item => (
                <li key={item.product.id} style={{ ...cartItemStyle, borderBottom: item.product.id === FREE_GIFT.id ? 'none' : '1px solid #eee' }}>
                  <div style={{ flexGrow: 1 }}>
                    {item.product.name}
                    <div style={{ fontSize: '0.9em', color: '#777' }}>
                      ₹{item.product.price} x {item.quantity} = ₹{(item.product.price * item.quantity).toFixed(0)}
                    </div>
                  </div>
                  {item.product.id !== FREE_GIFT.id ? (
                    <div style={quantityControlsStyle}>
                      <button style={quantityButtonStyle} onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button style={{ ...quantityButtonStyle, color: 'green' }} onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>+</button>
                      <button
                        style={{ ...quantityButtonStyle, marginLeft: '10px', color: 'red', borderColor: 'red' }}
                        onClick={() => handleRemoveFromCart(item.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <span style={freeGiftStyle}>FREE GIFT</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;