import React, { useEffect, useState } from "react";
import "./ProductManagement.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !category || !price) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      name: productName,
      category: category,
      price: price,
    };

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    setProductName("");
    setCategory("");
    setPrice("");
  };

  const handleEdit = (index) => {
    setProductName(products[index].name);
    setCategory(products[index].category);
    setPrice(products[index].price);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="product-container">
      <h1>Retail POS & Inventory System</h1>
      <h2>Product Management</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">
          {editIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹ {product.price}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products added yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
