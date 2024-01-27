// App.js

import React, { useState, useEffect } from 'react';
import PizzaOrderForm from './Components/PizzaOrderForm/PizzaOrderForm';
import CurrentOrders from './Components/CuurentOrders/CurrentOrders';
import PizzaStages from './Components/PizzaStages/PizzaStages';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [orderIdCounter, setOrderIdCounter] = useState(1);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 60000); // Update time every minute

    return () => clearInterval(timer);
  }, []);

  const handleOrderSubmit = (newOrder) => {
    if (orders.length < 10) {
      const orderId = orderIdCounter;
      setOrders([...orders, { ...newOrder, stage: 'Order Placed', orderId, startTime: new Date() }]);
      setOrderIdCounter((prevCounter) => prevCounter + 1);
    } else {
      alert('Not taking any order for now. Maximum orders reached.');
    }
  };

  const handleMoveToNextStage = (orderId) => {
    const updatedOrders = orders.map((o) =>
      o.orderId === orderId ? { ...o, stage: getNextStage(o.stage) } : o
    );
    setOrders(updatedOrders);
  };

  const handleClearOrder = (orderId) => {
    setOrders(orders.filter((o) => o.orderId !== orderId));
  };

  const getNextStage = (currentStage) => {
    const stages = ['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'];
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : currentStage;
  };

  return (
    <div className="p-4">
      <PizzaOrderForm onSubmit={handleOrderSubmit} maxOrders={10 - orders.length} />
      <div className="flex w-[95vw] m-2 space-x-2">
        <CurrentOrders orders={orders} onCancelOrder={handleClearOrder} timeElapsed={timeElapsed} />
        <PizzaStages
          orders={orders}
          onMoveToNextStage={handleMoveToNextStage}
          onClearOrder={handleClearOrder}
        />
      </div>
    </div>
  );
};

export default App;
