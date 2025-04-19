import React, { useState } from "react";

const Cart = ({ cartItems }) => {
  const [cartData, setCartData] = useState(cartItems);
  console.log("cartData", cartData);

  const handleIncreas = (index) => {
    const newCartData = [...cartData];
    console.log(newCartData);
    newCartData[index].quentity += 1;
    setCartData([...newCartData]);
  };

  const handleDecrese = (index) => {
    const newCartData = [...cartData];
    if (newCartData[index].quentity === 1) {
      return;
    }
    console.log(newCartData);
    newCartData[index].quentity -= 1;
    setCartData([...newCartData]);
  };

  const hanldeRemoveCartItem = (index) => {
    const newCartData = [...cartData];
    newCartData.splice(index, 1);
    setCartData([...newCartData]);
    localStorage.setItem("cartData", JSON.stringify(newCartData));
  };

  const totalPrice = cartData?.reduce((acc, item) => {
    return acc + Math.floor(item.quentity * item.price);
  }, 0);

  return (
    <>
      <h1>Your cart</h1>
      {cartItems?.length === 0 ? (
        <h2>Cart is empty</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>quentity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartData?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quentity}</td>
                <td>{item.price}</td>

                <td>{Math.floor(item.quentity * item.price)}</td>
                <td>
                  <button onClick={() => handleIncreas(index)}>increase</button>
                </td>
                <td>
                  <button onClick={() => handleDecrese(index)}>decrease</button>
                </td>
                <td>
                  <button onClick={() => hanldeRemoveCartItem(index)}>
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>{`Final Total : ${totalPrice}`}</h3>
    </>
  );
};

export default Cart;
