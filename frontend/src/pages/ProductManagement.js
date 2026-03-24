import React, { useEffect, useState } from "react";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  const saveProductsToLocalStorage = (updatedProducts) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();

    if (
      productName.trim() === "" ||
      category.trim() === "" ||
      price.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId !== null) {
      const updatedProducts = products.map((product) =>
        product.id === editId
          ? {
              ...product,
              name: productName,
              category: category,
              price: price,
            }
          : product
      );

      saveProductsToLocalStorage(updatedProducts);
      setEditId(null);
      alert("Product updated successfully");
    } else {
      const newProduct = {
        id: Date.now(),
        name: productName,
        category: category,
        price: price,
      };

      const updatedProducts = [...products, newProduct];
      saveProductsToLocalStorage(updatedProducts);
      alert("Product added successfully");
    }

    setProductName("");
    setCategory("");
    setPrice("");
  };

  const handleEdit = (product) => {
    setProductName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const updatedProducts = products.filter((product) => product.id !== id);
    saveProductsToLocalStorage(updatedProducts);
    alert("Product deleted successfully");
  };

  return (
    <div className="product-page">
      <h1>Product Management</h1>

      <form className="product-form" onSubmit={handleAddOrUpdateProduct}>
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
          {editId !== null ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="product-list">
        <h2>Product List</h2>

        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹ {product.price}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(product)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
