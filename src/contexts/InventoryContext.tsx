import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { products as initialProducts, Product } from '@/data/products';

interface InventoryContextType {
  products: Product[];
  getStock: (productId: string) => number;
  decrementStock: (productId: string, quantity: number) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const getStock = useCallback(
    (productId: string) => products.find(p => p.id === productId)?.stock ?? 0,
    [products]
  );

  // Called when an order is placed — decrements stock for each purchased item.
  // This simulates a real-time inventory sync: a purchase event propagates
  // immediately back to the product catalogue, reflecting updated availability
  // across the storefront (in-store and online).
  const decrementStock = useCallback((productId: string, quantity: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, stock: Math.max(0, p.stock - quantity) }
          : p
      )
    );
  }, []);

  return (
    <InventoryContext.Provider value={{ products, getStock, decrementStock }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider');
  return ctx;
};
