// PizzaStages.js

import React, { useState, useEffect } from "react";

const PizzaStages = ({ orders, onMoveToNextStage, onClearOrder }) => {
  const allStages = [
    "Order Placed",
    "Order in Making",
    "Order Ready",
    "Order Picked",
  ];
  const [stageTime, setStageTime] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateStageTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [orders]);

  const updateStageTime = () => {
    const updatedStageTime = { ...stageTime };

    orders.forEach((pizza) => {
      allStages.forEach((stage) => {
        const stageKey = `${pizza.orderId}-${stage}`;
        if (pizza.stage === stage && !updatedStageTime[stageKey]) {
          updatedStageTime[stageKey] = currentTime;
        }
      });
    });

    setStageTime(updatedStageTime);
  };

  const calculateTimeSpent = (orderId, stage) => {
    const stageKey = `${orderId}-${stage}`;
    if (stageTime[stageKey]) {
      const elapsedTime = Math.floor(
        (currentTime - new Date(stageTime[stageKey])) / 1000
      );
      return elapsedTime;
    }
    return 0;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} min ${seconds} sec`;
  };

  const ordersByStage = {};

  // Group orders by stage
  orders.forEach((pizza) => {
    if (!ordersByStage[pizza.stage]) {
      ordersByStage[pizza.stage] = [];
    }
    ordersByStage[pizza.stage].push(pizza);
  });

  const handleMoveToNextStage = (orderId) => {
    // Reset the stageTime for the order that is moving to the next stage
    const updatedStageTime = { ...stageTime };
    allStages.forEach((stage) => {
      const stageKey = `${orderId}-${stage}`;
      delete updatedStageTime[stageKey];
    });
    setStageTime(updatedStageTime);

    onMoveToNextStage(orderId);
  };

  return (
    <div className="w-[60vw] p-4 bg-gray-100 rounded-md shadow-md ">
      <h2 className="text-2xl font-bold mb-4">Pizza Stages</h2>

      <div className="flex text-center space-x-4">
        {allStages.map((stage) => (
          <div key={stage} className="flex-1">
            <h3 className="text-lg font-bold mb-2">{stage}</h3>
            {ordersByStage[stage] && ordersByStage[stage].length > 0 ? (
              ordersByStage[stage].map((pizza) => (
                <div
                  key={pizza.orderId}
                  className={`mb-4 flex flex-col items-center p-4 border rounded-md ${
                    calculateTimeSpent(pizza.orderId, stage) > 180
                      ? "bg-red-300"
                      : ""
                  }`}
                >
                  <p className="font-bold text-blue-500">
                    Order ID: {pizza.orderId}
                  </p>

                  <p className="text-gray-700">
                    {" "}
                    {formatTime(calculateTimeSpent(pizza.orderId, stage))}
                  </p>

                  <div className="flex mt-2">
                    {pizza.stage !== "Order Picked" && (
                      <button
                        onClick={() => handleMoveToNextStage(pizza.orderId)}
                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mr-2"
                      >
                        Next
                      </button>
                    )}
                    {pizza.stage === "Order Picked" && (
                      <button
                        onClick={() => onClearOrder(pizza.orderId)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      >
                        Clear Order
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders in this stage.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaStages;
