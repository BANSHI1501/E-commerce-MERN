import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handleFormSubmit = async () => {
    // Generate unique transaction ID
    const timestamp = Date.now().toString().slice(-6);
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newTransactionId = `TXN${timestamp}${randomString}`;
    setTransactionId(newTransactionId);

    // Save order to database
    try {
      console.log("Creating order with:", { transactionId: newTransactionId, totalAmount: totalPrice, totalQty: totalQty })
      
      const response = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          transactionId: newTransactionId,
          totalAmount: totalPrice,
          totalQty: totalQty,
        }),
      });

      const responseData = await response.json();
      console.log("Order response:", responseData)

      if (responseData.success) {
        console.log("Order created successfully!")
        setOrderConfirmed(true);
      } else {
        console.error("Order creation failed:", responseData.message)
        setOrderConfirmed(true);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setOrderConfirmed(true);
    }
  };

  const handleNewOrder = () => {
    setOrderConfirmed(false);
    // Clear cart and redirect to home
    window.location.href = '/';
  };

  // Show order confirmation page
  if (orderConfirmed) {
    return (
      <div className="container mx-auto mt-10">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-full max-w-md p-8 bg-white border-2 border-green-500 rounded-lg shadow-lg">
            {/* Checkmark Icon */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Confirmation Title */}
            <h1 className="mb-4 text-3xl font-bold text-center text-green-600">
              Order Confirmed!
            </h1>

            {/* Confirmation Message */}
            <p className="mb-6 text-center text-slate-600">
              Your order has been successfully received and confirmed by the shopkeeper.
            </p>

            {/* Order Details */}
            <div className="p-4 mb-6 rounded-lg bg-slate-50">
              <div className="flex justify-between pb-3 mb-3 border-b border-slate-200">
                <span className="text-slate-600">Transaction ID:</span>
                <span className="font-mono font-semibold text-slate-800">{transactionId}</span>
              </div>
              <div className="flex justify-between pb-3 mb-3 border-b border-slate-200">
                <span className="text-slate-600">Order Date:</span>
                <span className="font-semibold text-slate-800">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between pb-3 mb-3 border-b border-slate-200">
                <span className="text-slate-600">Order Time:</span>
                <span className="font-semibold text-slate-800">{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between pb-3 mb-3 border-b border-slate-200">
                <span className="text-slate-600">Total Items:</span>
                <span className="font-semibold text-slate-800">{totalQty}</span>
              </div>
              <div className="flex justify-between pb-3 mb-3 border-b border-slate-200">
                <span className="text-slate-600">Total Amount:</span>
                <span className="text-lg font-semibold text-blue-600">
                  {displayINRCurrency(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <span className="font-semibold text-green-600">Confirmed</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50">
              <p className="text-sm text-slate-700">
                <strong>Note:</strong> The shopkeeper will contact you soon for delivery confirmation. Keep your phone available.
              </p>
            </div>

            {/* Buttons */}
            <button
              onClick={handleNewOrder}
              className="w-full p-3 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="my-3 text-lg text-center">
        {data.length === 0 && !loading && (
          <p className="py-5 bg-white">No Data</p>
        )}
      </div>

      <div className="flex flex-col gap-10 p-4 lg:flex-row lg:justify-between">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full h-32 my-2 border rounded bg-slate-200 border-slate-300 animate-pulse"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt={product?.productId?.productName || 'Product image'}
                        className="object-scale-down w-full h-full mix-blend-multiply"
                      />
                    </div>
                    <div className="relative px-4 py-2">
                      {/**delete product */}
                      <div
                        className="absolute right-0 p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-blue-600">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-lg font-semibold text-slate-600">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="flex items-center justify-center w-6 h-6 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white "
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="flex items-center justify-center w-6 h-6 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white "
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/***summary  */}
        <div className="w-full max-w-sm mt-5 lg:mt-0">
          {loading ? (
            <div className="border h-36 bg-slate-200 border-slate-300 animate-pulse"></div>
          ) : (
            <div className="bg-white h-36">
              <h2 className="px-4 py-1 text-white bg-blue-600">Summary</h2>
              <div className="flex items-center justify-between gap-2 px-4 text-lg font-medium text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between gap-2 px-4 text-lg font-medium text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>

              <div className="mt-4">
                <h3 className="mb-2 font-semibold text-center">Payment Methods</h3>
                
                {/**QR Code Section */}
                <div className="mb-4 text-center">
                  <p className="mb-2 text-sm text-slate-600">Scan QR Code to Pay</p>
                  <img 
                    src={require('../assest/QR.png')} 
                    alt="Payment QR Code" 
                    className="w-40 h-40 mx-auto border rounded border-slate-300"
                  />
                </div>

                {/**Google Form Link */}
                <button 
                  className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  onClick={() => {
                    handleFormSubmit();
                    // Open Google Form in new tab after a short delay
                    setTimeout(() => {
                      window.open(
                        "https://docs.google.com/forms/d/e/1FAIpQLSfHBxJkP3WlhWPwrwsG-3wt7HPpoDKldRk1zFyTH3_hkaFtIQ/viewform?usp=sharing&ouid=114871190028956003079",
                        "_blank"
                      );
                    }, 100);
                  }}
                >
                  Complete Order Form
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
