import React, { useState } from 'react';
import logo from '../assets/marrigold_logo.png'
import defaultImage from '../assets/feat4.webp'  // Add a default image
import { useCart } from './CartContext';
import '../App.css'

// Send Order Items to Backend API
async function sendOrder(orderData) {
  console.log(orderData)
  const response = await fetch('http://127.0.0.1:8000/api/orders/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Network response was not ok: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data;
}

export default function Navbar() {
  const { cartItems, clearCart, removeFromCart, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCheckout = async () => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  
    const orderData = {
      items: cartItems.map(item => ({ items: item.id, quantity: item.quantity, menu: item.id,
        })),
      total_price: totalPrice,
      status: null,
      customer_name: 'kofo', // Set default value for customer_name
    };
  
    try {
      console.log(orderData)
      const data = await sendOrder(orderData);
      console.log('Order created:', data);
      clearCart(); // Clear the cart after successful checkout
      alert('Order placed successfully!');
      setIsCartOpen(false); // Close the cart after checkout
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to place order. Please try again.');
    }
  };
  

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };
  const handleAddToCart = (itemId) => {
    addToCart(itemId);
  };

  return (
    <>
      <div className="flex flex-wrap place-items-center font-Poppins">
        <section className="relative w-full">
          <nav className="flex justify-between bg-primary text-white max-w-full">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <img className='logo' src={logo} alt="" />
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li><a className="hover:text-gray-200" href="#">Home</a></li>
                <li><a className="hover:text-gray-200" href="#">Category</a></li>
                <li><a className="hover:text-gray-200" href="#">Collections</a></li>
                <li><a className="hover:text-gray-200" href="#">Contact Us</a></li>
              </ul>
              <div className="hidden xl:flex space-x-5 items-center">
                <a className="flex items-center hover:text-gray-200 relative" href="#" onClick={() => setIsCartOpen(!isCartOpen)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItems.length > 0 && (
                    <span className="cartItemsCount absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                      {cartItems.length}
                    </span>

                  )}
                </a>
                <a className="flex items-center hover:text-gray-200" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            </div>
            <a className="xl:hidden flex mr-6 items-center" href="#" onClick={() => setIsCartOpen(!isCartOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="fixed top-6 right-[5.5rem] lg:-top-2 lg:-right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </a>
            <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </a>
          </nav>
        </section>
      </div>

      {/* Cart Slide-out */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white text-black p-4 shadow-md transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <h1 className='text-lg font-bold mb-4'>Cart</h1>
            {cartItems.map(item => (
              
              <div key={item.id} className="flex justify-between mb-2">
                <div className="flex items-center">
                  
                  <img src={item.image ? item.image : defaultImage} alt={item.name} className="h-10 w-10 object-cover mr-2" />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleRemoveFromCart(item.id)} className="ml-2 text-red-500 hover:text-red-700">
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => handleAddToCart(item)} className="mr-2 text-green-500 hover:text-green-700">
                    +
                  </button>
                  <span>${item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={handleCheckout} className="bg-primary text-white px-4 py-2 rounded-md">
              Checkout
            </button>
            <button onClick={() => setIsCartOpen(false)} className="text-black hover:text-gray-600">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}