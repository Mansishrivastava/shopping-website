// src/components/ProductItem.js
import React, { useState } from 'react';

function ProductItem({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart({ ...product, quantity });
    setQuantity(1);
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    textAlign: 'center',
  };

  const buttonStyleAdd = {
    background: '#3b3bff',
    color: 'white',
    borderRadius: '7px',
    outline: '0',
    padding: '0.7em 2em', 
    border: '0',
    cursor: 'pointer',
    marginTop: '15px',
    width: '100%', 
  };

  return (
    <div style={cardStyle}>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button style={buttonStyleAdd} onClick={handleAddToCartClick}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;