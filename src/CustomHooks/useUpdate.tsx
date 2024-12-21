import { useState } from 'react';
import axios from 'axios';

const useUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (firebaseKey: string, updatedProduct: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.put(`https://ecomm-ebebd-default-rtdb.firebaseio.com/products/${firebaseKey}.json`, updatedProduct);
    } catch (error) {
      setError("Error updating product");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProduct, isLoading, error };
};

export default useUpdate;
