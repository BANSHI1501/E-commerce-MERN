import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getOrders.url, {
        method: SummaryApi.getOrders.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const responseData = await response.json();

      console.log("Orders response:", responseData)
      console.log("Orders data:", responseData.data)
      if (responseData.data && responseData.data.length > 0) {
        console.log("First order:", responseData.data[0])
        console.log("First order orderId:", responseData.data[0].orderId)
        console.log("All orders with their IDs:", responseData.data.map(o => ({ orderId: o.orderId, id: o._id })))
      }

      if (responseData.success) {
        setOrders(responseData.data);
        console.log("Orders set to state:", responseData.data)
      } else {
        console.error("Failed to fetch orders:", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Auto-refresh orders every 2 minutes
    const interval = setInterval(() => {
      fetchOrders();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(SummaryApi.updateOrderStatus.url, {
        method: SummaryApi.updateOrderStatus.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          orderStatus: newStatus,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Orders Received</h1>

      {loading && (
        <div className="py-8 text-center">
          <p className="text-gray-600">Loading orders...</p>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="py-8 text-center rounded bg-gray-50">
          <p className="text-gray-600">No orders received yet</p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">
                  Order ID
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Customer
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Items
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Total Amount
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Order Date
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Status
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    <span className="font-mono text-sm font-semibold text-blue-600">
                      {order.orderId ? order.orderId : order._id}
                    </span>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div>
                      <p className="font-semibold">
                        {order.userId?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-600">{order.userId?.email}</p>
                      {order.phoneNumber && (
                        <p className="text-sm text-gray-600">{order.phoneNumber}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <p className="font-semibold">{order.totalQty} items</p>
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order.orderId ? null : order.orderId)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {selectedOrder === order.orderId ? "Hide" : "View"} Details
                    </button>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <p className="font-semibold text-green-600">
                      {displayINRCurrency(order.totalAmount)}
                    </p>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <p>{new Date(order.orderDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.orderDate).toLocaleTimeString()}
                    </p>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="p-4 mt-6 border border-blue-300 rounded bg-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Order Details</h2>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
          {orders.map((order) => {
            if (order.orderId === selectedOrder) {
              return (
                <div key={order._id}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600">Order ID</p>
                      <p className="font-mono font-semibold">{order.orderId}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Order Date</p>
                      <p className="font-semibold">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="mb-2 font-bold">Products:</h3>
                    <div className="p-3 bg-white rounded">
                      {order.products && order.products.length > 0 ? (
                        order.products.map((product, idx) => (
                          <div key={idx} className="py-2 border-b last:border-b-0">
                            <p className="font-semibold">
                              {product.productId?.productName || "Unknown Product"}
                            </p>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Qty: {product.quantity}</span>
                              <span>Price: {displayINRCurrency(product.price)}</span>
                              <span>
                                Total: {displayINRCurrency(product.price * product.quantity)}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No products in this order</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-green-600">
                        {displayINRCurrency(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
