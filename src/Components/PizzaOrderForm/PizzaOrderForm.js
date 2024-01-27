// PizzaOrderForm.js

import React, { useState } from 'react';

const PizzaOrderForm = ({ onSubmit, maxOrders }) => {
  const [order, setOrder] = useState({
    type: 'Veg',
    size: 'Medium',
    base: 'Thin',
  });

  const handleInputChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (maxOrders > 0) {
      onSubmit(order);
      setOrder({
        type: 'Veg',
        size: 'Medium',
        base: 'Thin',
      });
    } else {
      alert('Not taking any order for now. Maximum orders reached.');
    }
  };

  return (
    <div className="w-[95vw] mx-2 mt-2 p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mr-4 mb-4">Pizza Order Form</h2>

      {maxOrders > 0 ? (
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-2">Type:</label>
            <select
              name="type"
              value={order.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold mb-2">Size:</label>
            <select
              name="size"
              value={order.size}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Large">Large</option>
              <option value="Medium">Medium</option>
              <option value="Small">Small</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold mb-2">Base:</label>
            <select
              name="base"
              value={order.base}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Thin">Thin</option>
              <option value="Thick">Thick</option>
            </select>
          </div>

          <div className="flex-1">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Place Order
            </button>
          </div>
        </form>
      ) : (
        <p className="text-red-500">Not taking any order for now. Maximum orders reached.</p>
      )}
    </div>
  );
};

export default PizzaOrderForm;
