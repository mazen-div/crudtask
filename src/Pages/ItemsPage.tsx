import React, { useState } from 'react';
import CardComponent from '../Components/Card/CardComponent.tsx';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  images: string[];
  thumbnail: string;
}

interface PageItemsProps {
  products: Product[]; // Changed to expect an array of products
  title?: string;
}

const PageItems: React.FC<PageItemsProps> = ({ products, title = 'Products' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of products per page

  // Calculate indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Pagination handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pageitems">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>

        {currentProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {currentProducts.map((product) => (
              <CardComponent key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div>No products available.</div>
        )}

        {/* Pagination */}
        <nav
          className="flex justify-center items-center mt-8 bg-[#111827] rounded-lg py-3"
          aria-label="Page navigation"
        >
          <ul className="list-style-none flex space-x-2">
            <li>
              <button
                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 ${
                  currentPage === 1 ? 'text-gray-500' : 'text-white hover:bg-gray-700'
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    currentPage === index + 1
                      ? 'bg-white text-[#111827]'
                      : 'bg-transparent text-white hover:bg-gray-700'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 ${
                  currentPage === totalPages ? 'text-gray-500' : 'text-white hover:bg-gray-700'
                }`}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PageItems;
