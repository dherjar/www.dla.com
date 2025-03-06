import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

interface Product {
  name: string;
  brand: string;
  priceOre: number;
  image: string;
  description: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.brand}-${product.name}`,
      name: `${product.brand} ${product.name}`,
      priceOre: product.priceOre
    });
    alert(`${product.brand} ${product.name} added to cart!`);
  };

  // Generate a color-based fallback image instead of using placeholders
  const generateFallbackImage = () => {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    return (
      <div style={{
        backgroundColor: randomColor,
        width: '100%',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        borderRadius: '4px'
      }}>
        {product.brand} {product.name}
      </div>
    );
  };

  // Pre-load image to check if it's valid
