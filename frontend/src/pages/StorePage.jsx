import React from 'react';
import { CartProvider } from '../components/CartContext';
import Navbar from '../components/Navbar';
import MenuList from '../components/MenuList';
import Categories from '../components/Categories';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 ">
        <Navbar />
        <Categories />
        <MenuList />
      </div>
    </CartProvider>
  );
}

export default App;