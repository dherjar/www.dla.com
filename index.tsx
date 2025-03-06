
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

const productList = [
  // Smartphones
  {
    name: "Galaxy S23",
    brand: "Samsung",
    priceOre: 999.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-s911-446016-sm-s911bzkbins-534858036",
    description: "6.8-inch Dynamic AMOLED, 200MP camera.",
    category: "Smartphone"
  },
  {
    name: "iPhone 15",
    brand: "Apple",
    priceOre: 1299,
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
    description: "6.7-inch Super Retina XDR, A17 Chip.",
    category: "Smartphone"
  },
  {
    name: "OnePlus 11",
    brand: "OnePlus",
    priceOre: 569.99,
    image: "https://oasis.opstatics.com/content/dam/oasis/page/2023/na/oneplus-11/specs/green-img.png",
    description: "6.7-inch 120Hz AMOLED, Hasselblad Camera.",
    category: "Smartphone"
  },
  {
    name: "DLA Fold X",
    brand: "DLA",
    priceOre: 1099.99,
    image: "https://img.freepik.com/premium-photo/folding-smartphone-isolated-white-background_887554-10236.jpg",
    description: "7.6-inch Foldable AMOLED, Triple Camera.",
    category: "Smartphone"
  },
  {
    name: "DLA Ultra",
    brand: "DLA",
    priceOre: 399.99,
    image: "https://img.freepik.com/free-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg",
    description: "6.7-inch AMOLED, 108MP Camera.",
    category: "Smartphone"
  },
  {
    name: "DLA Lite",
    brand: "DLA",
    priceOre: 199.99,
    image: "https://img.freepik.com/free-photo/smartphone-device-mockup_155003-1865.jpg",
    description: "6.4-inch AMOLED, 50MP Camera.",
    category: "Smartphone"
  },
  {
    name: "Pixel 8 Pro",
    brand: "Google",
    priceOre: 899.99,
    image: "https://lh3.googleusercontent.com/9AoRq6CVo-bcxxu8IwUcKlPQ0or9g1Eg0ykhGNs_T0TWn7I0f5sW3XfJg-m6zvAZg932vg9G1ZR1Ie0AK2NvBc_rTCyDz-H__tE=rw-e365-w1200",
    description: "6.7-inch LTPO OLED, Google Tensor G3 chip.",
    category: "Smartphone"
  },
  {
    name: "Xperia 5 V",
    brand: "Sony",
    priceOre: 799.99,
    image: "https://www.sony.com/image/d7ef1accd3c51bdffd593cfbc42f4e2e?fmt=png-alpha&wid=660&hei=660",
    description: "6.1-inch OLED, Snapdragon 8 Gen 2.",
    category: "Smartphone"
  },
  // Laptops
  {
    name: "MacBook Pro 16",
    brand: "Apple",
    priceOre: 2499.99,
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202",
    description: "M3 Pro chip, 16-inch Liquid Retina XDR display.",
    category: "Laptop"
  },
  {
    name: "XPS 15",
    brand: "Dell",
    priceOre: 1699.99,
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/black/notebook-xps-15-9530-t-black-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&wid=4000&hei=2819&qlt=100,1&resMode=sharp2&size=4000,2819&chrss=full",
    description: "Intel Core i9, 15.6-inch 4K OLED touch display.",
    category: "Laptop"
  },
  {
    name: "Zenbook Pro",
    brand: "Asus",
    priceOre: 1599.99,
    image: "https://dlcdnwebimgs.asus.com/gain/EB1C9B83-AB9E-4B68-87E4-8A60F22A9658/w1000/h732",
    description: "Intel Core i7, 14.5-inch 3K OLED display.",
    category: "Laptop"
  },
  {
    name: "Gaming Laptop X",
    brand: "DLA",
    priceOre: 1299.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=250&h=150&fit=crop",
    description: "AMD Ryzen 9, RTX 4070, 17.3-inch 240Hz display.",
    category: "Laptop"
  },
  // Tablets
  {
    name: "iPad Pro 12.9",
    brand: "Apple",
    priceOre: 1099.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=250&h=150&fit=crop",
    description: "M2 chip, 12.9-inch Liquid Retina XDR display.",
    category: "Tablet"
  },
  {
    name: "Galaxy Tab S9 Ultra",
    brand: "Samsung",
    priceOre: 1199.99,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=250&h=150&fit=crop",
    description: "14.6-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2.",
    category: "Tablet"
  },
  {
    name: "Tablet Pro",
    brand: "DLA",
    priceOre: 499.99,
    image: "https://images.unsplash.com/photo-1585790050230-5ab129935db0?w=250&h=150&fit=crop",
    description: "11-inch IPS display, Octa-core processor.",
    category: "Tablet"
  },
  // Smart Watches
  {
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    priceOre: 799.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=250&h=150&fit=crop",
    description: "49mm titanium case, Always-On Retina display.",
    category: "Smart Watch"
  },
  {
    name: "Galaxy Watch 6 Classic",
    brand: "Samsung",
    priceOre: 399.99,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=250&h=150&fit=crop",
    description: "47mm stainless steel, Super AMOLED display.",
    category: "Smart Watch"
  },
  {
    name: "Smartwatch Essential",
    brand: "DLA",
    priceOre: 149.99,
    image: "https://images.unsplash.com/photo-1617043786394-ae546ae9ba13?w=250&h=150&fit=crop",
    description: "1.4-inch AMOLED, heart rate monitoring, GPS.",
    category: "Smart Watch"
  },
  // Headphones
  {
    name: "AirPods Pro 2",
    brand: "Apple",
    priceOre: 249.99,
    image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=250&h=150&fit=crop",
    description: "Active noise cancellation, Adaptive Transparency.",
    category: "Audio"
  },
  {
    name: "QuietComfort Ultra",
    brand: "Bose",
    priceOre: 379.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=250&h=150&fit=crop",
    description: "Spatial audio, advanced noise cancellation.",
    category: "Audio"
  },
  {
    name: "WH-1000XM5",
    brand: "Sony",
    priceOre: 399.99,
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=250&h=150&fit=crop",
    description: "Industry-leading noise cancellation, LDAC codec.",
    category: "Audio"
  },
  {
    name: "SoundPro Buds",
    brand: "DLA",
    priceOre: 129.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=250&h=150&fit=crop",
    description: "Noise cancellation, 28-hour battery life.",
    category: "Audio"
  }
];

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const categories = [...new Set(productList.map(product => product.category))];
  
  const filteredProducts = productList.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = searchQuery.trim() === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Welcome to DLA Electronics Store</h1>
        
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              padding: "8px", 
              width: "300px", 
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button 
            onClick={() => setSelectedCategory(null)}
            style={{ 
              padding: "8px 16px", 
              backgroundColor: selectedCategory === null ? "#4A90E2" : "#f1f1f1",
              color: selectedCategory === null ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            All Products
          </button>
          {categories.map(category => (
            <button 
              key={category} 
              onClick={() => setSelectedCategory(category)}
              style={{ 
                padding: "8px 16px", 
                backgroundColor: selectedCategory === category ? "#4A90E2" : "#f1f1f1",
                color: selectedCategory === category ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "flex-start" }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p>No products found. Try a different search or category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

