import { useContext, useState } from "react";
import attachNamesAndPrices from "../utils/attachNamesAndPrices";
import calculateOrderTotal from "../utils/calculateOrderTotal";
import formatMoney from "../utils/formatMoney";
import OrderContext from "./context/OrderContext";

const usePizza = ({ pizzas, values: { name, email, pancakeSyrup } }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useContext(OrderContext);

  const addOrder = orderedPizza => setOrders([...orders, orderedPizza]);

  const removeOrder = index =>
    setOrders([...orders.slice(0, index), ...orders.slice(index + 1)]);

  const submitOrder = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const body = JSON.stringify({
      orders: await attachNamesAndPrices(orders, pizzas),
      total: formatMoney(await calculateOrderTotal(orders, pizzas)),
      name,
      email,
      pancakeSyrup,
    });

    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/place_order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const text = JSON.parse(await res.text());

    if (res.status >= 400 && res.status < 600) {
      setError(text.message);
    } else {
      setMessage(text.message);
    }
    setLoading(false);
  };

  return {
    orders,
    addOrder,
    removeOrder,
    loading,
    error,
    message,
    submitOrder,
  };
};

export default usePizza;
