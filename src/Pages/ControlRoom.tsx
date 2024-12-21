import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../Components/ProductForm/ProductForm.tsx';
import useUpdate from '../CustomHooks/useUpdate.tsx'; // Import the useUpdate hook

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    discountPercentage: '',
    price: '',
    rating: '',
    stock: '',
    thumbnail: '',
    images: '',
  });

  const { updateProduct, isLoading, error } = useUpdate(); // Use the custom hook

  useEffect(() => {
    axios
      .get('https://ecomm-ebebd-default-rtdb.firebaseio.com/products.json')
      .then((response) => {
        const fetchedProducts = [];
        for (let key in response.data) {
          fetchedProducts.push({ firebaseKey: key, ...response.data[key] });
        }
        setProducts(fetchedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleDeleteProduct = (firebaseKey: string) => {
    axios
      .delete(`https://ecomm-ebebd-default-rtdb.firebaseio.com/products/${firebaseKey}.json`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.firebaseKey !== firebaseKey));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleEditProduct = (product: any) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      description: product.description,
      discountPercentage: product.discountPercentage,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      thumbnail: product.thumbnail,
      images: product.images.join(', '),
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProduct = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedProduct = {
      ...currentProduct,
      ...formData,
      images: formData.images.split(',').map((img) => img.trim()),
      discountPercentage: parseInt(formData.discountPercentage),
      price: parseFloat(formData.price),
      rating: parseInt(formData.rating),
      stock: parseInt(formData.stock),
    };

    // Use the updateProduct function from the custom hook
    updateProduct(currentProduct.firebaseKey, updatedProduct);

    setIsEditing(false);
    setCurrentProduct(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      discountPercentage: '',
      price: '',
      rating: '',
      stock: '',
      thumbnail: '',
      images: '',
    });
  };

  useEffect(() => {
    if (isEditing) {
      const formElement = document.getElementById('product-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [isEditing]);

  return (
    <div className="product-table-container">
      <h1>Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.firebaseKey}>
                <td>
                  <img
                    src={product.images}
                    alt={product.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td>{product.title}</td>
                <td>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.firebaseKey)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isEditing && (
        <div id="product-form">
          <ProductForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleUpdateProduct}
            isEditing={isEditing}
          />
        </div>
      )}

      {isLoading && <p>Updating...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ProductTable;
