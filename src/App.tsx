
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PageItems from './Pages/ItemsPage.tsx';
import useFetch from './CustomHooks/UseFetch.tsx';
import './App.css';
import Navbar from './Components/Nav/Nav.tsx';
import AddProduct from './Pages/AddProduct.tsx';
import ProductTable from './Pages/ControlRoom.tsx';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const App: React.FC = () => {
  const { data, loading, error } = useFetch<{ [key: string]: Product }>('https://ecomm-ebebd-default-rtdb.firebaseio.com/products.json');

  if (loading) {
    return (
      <div className="loader-container">
        
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle r="32" cy="40" cx="40"></circle>
          </svg>
        </div>

       
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

      
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect height="64" width="64" y="8" x="8"></rect>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const products = data ? Object.values(data) : [];

  return (
    <Router>
      <div>
        <Navbar />
        <nav className="p-4 bg-gray-100">
          <Link to="/" className="mr-4 text-blue-500 hover:underline">Home</Link>
          <Link to="/AddProduct" className="text-blue-500 hover:underline">AddProduct</Link>
          
        </nav>
        <Routes>
          <Route path="/" element={<PageItems products={products} title="Products" />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/Dashboard" element={<ProductTable products={products} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
