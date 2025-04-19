import axios from "axios";
import React, { use, useEffect, useState } from "react";
import Navbar from "./Navbar";

const ProductManagement = ({ setCartItems, cartItems }) => {
  const [productList, setProductList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quentity: 1,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/products.json")
      .then((res) => {
        const products = res.data;
        setProductList(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkValidation = () => {
    if (!formData.name || !formData.description || !formData.price) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setFormData({ name: "", description: "", price: "" });
    setIsEditing(false);
    setCurrentProduct({});
    setError(false);
  };

  const addProduct = () => {
    const checkValidationResult = checkValidation();
    if (!checkValidationResult) return;

    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      quentity: 1,
    };
    setProductList([...productList, newProduct]);
    clearForm();
  };

  const editProduct = (product) => {
    setFormData(product);
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const updateProduct = () => {
    const checkValidationResult = checkValidation();
    if (!checkValidationResult) return;

    const updatedProduct = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      quentity: 1,
    };

    const updatedProductList = productList.map((product) =>
      product.name === currentProduct.name ? updatedProduct : product
    );
    setProductList(updatedProductList);
    clearForm();
  };

  const deleteProduct = (product) => {
    const updatedProductList = productList.filter(
      (item) => item.name !== product.name
    );
    setProductList(updatedProductList);
  };

  const addTocart = (product) => {
    const alreadyInCart = JSON.parse(
      localStorage.getItem("cartData") || "[]"
    ).some((item) => item.name === product.name);
    if (alreadyInCart) {
      alert("Product already in cart");
      return;
    }
    const cartData = JSON.parse(localStorage.getItem("cartData") || "[]");
    setCartItems(cartData);
    cartData.push(product);
    localStorage.setItem("cartData", JSON.stringify(cartData));
    alert("Product added to cart");
  };

  return (
    <>
      <Navbar role="user" cartCount={cartItems?.length} />

      <h1>ProductManagement</h1>
      <input
        style={{ display: "block", margin: "10px", height: "30px" }}
        type="text"
        placeholder="Enter name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        style={{ display: "block", margin: "10px", height: "30px" }}
        type="number"
        placeholder="Enter price"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        style={{ display: "block", margin: "10px", height: "30px" }}
        type="text"
        placeholder="Enter description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      {error && <p style={{ color: "red" }}>Please add required data</p>}

      <button
        onClick={isEditing ? updateProduct : addProduct}
        style={{ margin: "20px" }}
      >
        {isEditing ? "Update Product" : "Add Product"}
      </button>
      {isEditing && (
        <button onClick={clearForm} style={{ margin: "20px" }}>
          Cancel
        </button>
      )}

      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => editProduct(product)}>Edit</button>
                <button onClick={() => deleteProduct(product)}>Delete</button>
                <button onClick={() => addTocart(product)}>Add to cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductManagement;
