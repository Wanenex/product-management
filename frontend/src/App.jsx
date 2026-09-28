import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          price: Number(price),
          category: category
        })
      });

      if (response.ok) {
        alert("Product added successfully!");

        setName("");
        setPrice("");
        setCategory("");

        fetchProducts();
      }

    } catch (error) {
      console.error("Error adding product:", error);
      alert("Unable to connect to backend");
    }
  };

  return (
    <div className="app">

      <aside className="sidebar">
        <h2>ProductHub</h2>

        <nav>
          <a className="active">Dashboard</a>
          <a>Products</a>
        </nav>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <h1>Product Management</h1>
          <p>Manage your products in one place</p>
        </header>

        <section className="dashboard">

          <div className="card">
            <h3>Total Products</h3>
            <h2>{products.length}</h2>
          </div>

          <div className="card">
            <h3>Categories</h3>
            <h2>
              {new Set(products.map(product => product.category)).size}
            </h2>
          </div>

          <div className="card">
            <h3>Inventory Status</h3>
            <h2>Active</h2>
          </div>

        </section>

        <section className="product-section">

          <div className="section-header">
            <div>
              <h2>Add Product</h2>
              <p>Create a new product</p>
            </div>
          </div>

          <form className="product-form" onSubmit={addProduct}>

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <button type="submit">
              + Add Product
            </button>

          </form>

        </section>

        <section className="product-section product-list">

          <div className="section-header">
            <div>
              <h2>Product List</h2>
              <p>Products stored in H2 database</p>
            </div>
          </div>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr key={product.id}>

                  <td>{product.id}</td>

                  <td>{product.name}</td>

                  <td>₹ {product.price}</td>

                  <td>
                    <span className="category">
                      {product.category}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </section>

      </main>

    </div>
  );
}

export default App;