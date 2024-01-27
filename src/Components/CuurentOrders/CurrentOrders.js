// CurrentOrders.js

import React, { useState, useEffect } from 'react';

const CurrentOrders = ({ orders, onCancelOrder }) => {
  const [timeElapsed, setTimeElapsed] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      updateElapsedTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [orders]);

  const updateElapsedTime = () => {
    const currentTime = new Date();
    const updatedTimeElapsed = {};

    orders.forEach((pizza) => {
      const elapsedSeconds = Math.floor((currentTime - new Date(pizza.startTime)) / 1000);
      updatedTimeElapsed[pizza.orderId] = elapsedSeconds;
    });

    setTimeElapsed(updatedTimeElapsed);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div className="w-[40vw] p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Current Orders</h2>

      {orders.length > 0 ? (
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Stage</th>
              <th className="py-2">Total Time Spent</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.orderId} className="border-t">
                <td className="py-2">{o.orderId}</td>
                <td className="py-2">{o.stage}</td>
                <td className="py-2">{formatTime(timeElapsed[o.orderId])}</td>
                <td className="py-2">
                  {o.stage !== 'Order Ready' && o.stage !== 'Order Picked' ? (
                    <button
                      onClick={() => onCancelOrder(o.orderId)}
                      className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default CurrentOrders;
