import React, { useState, useRef } from 'react';

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    images: [''],
    thumbnail: '',
  });

  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
  const [errorFields, setErrorFields] = useState<string[]>([]); // Track error fields
  const alertRef = useRef<HTMLDivElement>(null); // Ref for the alert

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'discountPercentage' || name === 'rating' || name === 'stock'
        ? parseFloat(value)
        : value,
    }));
    setErrorFields((prev) => prev.filter((field) => field !== name)); // Remove field from error list if updated
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      images: [value],
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      thumbnail: value,
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    const errorMessages: string[] = [];

    if (!formData.title.trim()) {
      errors.push('title');
      errorMessages.push('Title is required.');
    }

    if (!formData.description.trim()) {
      errors.push('description');
      errorMessages.push('Description is required.');
    }

    if (!formData.category.trim()) {
      errors.push('category');
      errorMessages.push('Category is required.');
    }

    if (formData.price <= 0) {
      errors.push('price');
      errorMessages.push('Price must be greater than 0.');
    }

    if (formData.discountPercentage < 0 || formData.discountPercentage > 100) {
      errors.push('discountPercentage');
      errorMessages.push('Discount Percentage must be between 0 and 100.');
    }

    if (formData.rating < 0 || formData.rating > 5) {
      errors.push('rating');
      errorMessages.push('Rating must be between 0 and 5.');
    }

    if (formData.stock < 0) {
      errors.push('stock');
      errorMessages.push('Stock must be a positive number.');
    }

    if (!formData.images[0].trim()) {
      errors.push('images');
      errorMessages.push('Image URL is required.');
    }

    setErrorFields(errors);

    if (errors.length > 0) {
      setAlert({
        type: 'danger',
        message: `Please correct the following errors:\n\n- ${errorMessages.join('\n- ')}`,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const response = await fetch('https://ecomm-ebebd-default-rtdb.firebaseio.com/products.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert({ type: 'success', message: 'Product added successfully!' });
        setFormData({
          title: '',
          description: '',
          category: '',
          price: 0,
          discountPercentage: 0,
          rating: 0,
          stock: 0,
          images: [''],
          thumbnail: '',
        });
        setErrorFields([]); // Clear errors
      } else {
        setAlert({ type: 'danger', message: 'Failed to add product. Please try again.' });
      }
    } catch (error) {
      setAlert({ type: 'danger', message: 'An error occurred. Please try again.' });
    }

    // Scroll to the alert
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderAlert = () => {
    if (!alert) return null;

    const alertStyles = {
      success: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
      danger: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
      info: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
      warning: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
    };

    return (
      <div
        id="form-alert"
        ref={alertRef}
        className={`p-4 mb-4 text-sm rounded-lg ${alertStyles[alert.type]}`}
        role="alert"
      >
        <span className="font-medium">{alert.type === 'danger' ? 'Error' : 'Success'}: </span>
        {alert.message}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      {renderAlert()}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errorFields.includes('title') ? 'border-red-500' : ''}`}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errorFields.includes('description') ? 'border-red-500' : ''}`}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errorFields.includes('category') ? 'border-red-500' : ''}`}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block font-medium">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errorFields.includes('price') ? 'border-red-500' : ''}`}
            required
          />
        </div>

        {/* Discount Percentage */}
        <div>
          <label htmlFor="discountPercentage" className="block font-medium">
            Discount Percentage
          </label>
          <input
            type="number"
            name="discountPercentage"
            id="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errorFields.includes('discountPercentage') ? 'border-red-500' : ''}`}
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block font-medium">
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errorFields.includes('rating') ? 'border-red-500' : ''}`}
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block font-medium">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className={`w-full border rounded p-2 ${errorFields.includes('stock') ? 'border-red-500' : ''}`}
            required
          />
        </div>

        {/* Images */}
        <div>
          <label htmlFor="images" className="block font-medium">
            Image URL
          </label>
          <input
            type="text"
            name="images"
            id="images"
            value={formData.images[0]}
            onChange={handleImageChange}
            className={`w-full border rounded p-2 ${errorFields.includes('images') ? 'border-red-500' : ''}`}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
