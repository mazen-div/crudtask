import React from 'react';

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

interface CardComponentProps {
  product: Product; 
}

const CardComponent: React.FC<CardComponentProps> = ({ product }) => {
  
  const price = parseFloat(product.price.toString());
  const discountPrice = price - (price * product.discountPercentage) / 100;

  return (
    <div className="w-full max-w-sm bg-[#27272a] border border-gray-200 rounded-2xl shadow-lg dark:bg-[#27272a] dark:border-gray-700 flex flex-col">
      <a href="#" className="flex-1">
        <div className="relative rounded-t-2xl" style={{
          backgroundColor: '#191a1a',
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(114, 114, 114, 0.3) 25%, rgba(114, 114, 114, 0.3) 26%, transparent 27%, transparent 74%, rgba(114, 114, 114, 0.3) 75%, rgba(114, 114, 114, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(114, 114, 114, 0.3) 25%, rgba(114, 114, 114, 0.3) 26%, transparent 27%, transparent 74%, rgba(114, 114, 114, 0.3) 75%, rgba(114, 114, 114, 0.3) 76%, transparent 77%, transparent)',
          backgroundSize: '55px 55px',
        }}>
          <div className="w-full h-64 relative overflow-hidden rounded-t-2xl">
            <img
              className="w-full h-full object-contain transform transition-transform duration-300 ease-in-out hover:scale-110"
              src={product.images[0]} 
              alt={product.title}
            />
          </div>
        </div>
      </a>
      <div className="px-5 py-5 flex flex-col flex-grow bg-[#27272a] rounded-b-2xl">
        <a href="#" className="flex-grow">
          <h5 className="text-xl font-semibold tracking-tight text-[#d9d9d9]">{product.title}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${index < Math.round(product.rating) ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          {/* Original price with line-through */}
          <span className="text-xl text-red-500 line-through">${price.toFixed(2)}</span>
          {/* Discounted price */}
          <span className="text-3xl font-bold text-[#d9d9d9]">${discountPrice.toFixed(2)}</span>
          <span className="text-sm text-green-500 font-semibold">
            {product.discountPercentage}% OFF
          </span>
        </div>
       
      </div>
    </div>
  );
};

export default CardComponent;
