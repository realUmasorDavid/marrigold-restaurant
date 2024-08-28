import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import defaultImage from '../assets/feat4.webp'  // Add a default image

// Get Menu Items from backend API
async function fetchMenuItems() {
  const response = await fetch('http://127.0.0.1:8000/api/menus');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

// Order Form Component
function OrderForm({ menuItems }) {
  const [orderData, setOrderData] = useState({
    items: [],
    total_price: 0,
    status: null, // Status to null by default
    customer_name: '', // Customer_name field
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (event) => {
    const selectedItemIds = Array.from(event.target.selectedOptions, option => parseInt(option.value));
    const selectedItems = menuItems.filter(item => selectedItemIds.includes(item.id));
    const totalPrice = selectedItems.reduce((total, item) => total + parseFloat(item.price), 0);

    setOrderData((prevData) => ({
      ...prevData,
      items: selectedItemIds,
      total_price: totalPrice,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Sending order data:', orderData);
      const data = await sendOrder(orderData);
      console.log('Order created:', data);
      // Success message 
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };


}

// Menu List Component
function MenuList() {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadMenuItems() {
      try {
        const data = await fetchMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    }

    loadMenuItems();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
  };


  return (
    <>
      <div className='font-Poppins '>
        <div className="grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map(item => (
            <div key={item.id} className='p-8 '>
              <img src={item.image ? item.image : defaultImage} alt={item.name} className="h-48 w-48 object-cover m-auto" />
              <div className="">
                <p className='my-2'>{item.name}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <p>₦{item.price} per spoon</p>
                    <p>{item.category}</p>
                  </div>
                  <button className='bg-primary rounded-lg px-2 h-6 text-xs text-center text-white' onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <OrderForm menuItems={menuItems} />
    </>
  );
}

export default MenuList;