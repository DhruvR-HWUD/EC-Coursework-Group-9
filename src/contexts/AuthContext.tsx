import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Order {
  id: string;
  date: string;
  items: { name: string; size: string; quantity: number; price: number }[];
  subtotal: number;
  discount: number;
  total: number;
  loyaltyPointsEarned: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned';
  deliveryMethod: 'home' | 'click-collect';
  store?: string;
  returnRequested?: boolean;
}

export interface UserProfile {
  email: string;
  name: string;
  loyaltyPoints: number;
  membershipStatus: 'active' | 'inactive';
  membershipType: string;
  addresses: { id: string; label: string; address: string; city: string; postcode: string; isDefault: boolean }[];
  orders: Order[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addOrder: (order: Order) => void;
  requestReturn: (orderId: string) => void;
  lastOrder: Order | null;
}

const testUser: UserProfile = {
  email: 'testcustomer@ecothreads.com',
  name: 'Emma Green',
  loyaltyPoints: 250,
  membershipStatus: 'active',
  membershipType: 'EcoWardrobe',
  addresses: [
    { id: 'addr-1', label: 'Home', address: '42 Willow Lane', city: 'London', postcode: 'SW1A 1AA', isDefault: true },
    { id: 'addr-2', label: 'Work', address: '15 Innovation Way', city: 'London', postcode: 'EC2A 4BX', isDefault: false },
  ],
  orders: [
    {
      id: 'VB-2024-001',
      date: '2025-12-15',
      items: [
        { name: 'Organic Linen Wrap Dress', size: 'M', quantity: 1, price: 89.99 },
        { name: 'Cork & Canvas Tote Bag', size: 'One Size', quantity: 1, price: 45.99 },
      ],
      subtotal: 135.98,
      discount: 13.60,
      total: 122.38,
      loyaltyPointsEarned: 122,
      status: 'Delivered',
      deliveryMethod: 'home',
    },
    {
      id: 'VB-2024-002',
      date: '2026-01-28',
      items: [
        { name: 'Recycled Cashmere Sweater', size: 'S', quantity: 1, price: 129.99 },
      ],
      subtotal: 129.99,
      discount: 0,
      total: 129.99,
      loyaltyPointsEarned: 130,
      status: 'Delivered',
      deliveryMethod: 'click-collect',
      store: 'Verde Boutique — Covent Garden',
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const login = useCallback((email: string, password: string): boolean => {
    if (email === 'testcustomer@ecothreads.com' && password === 'Eco1234') {
      setUser({ ...testUser });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setLastOrder(null);
  }, []);

  const addOrder = useCallback((order: Order) => {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        orders: [order, ...prev.orders],
        loyaltyPoints: prev.loyaltyPoints + order.loyaltyPointsEarned,
      };
    });
    setLastOrder(order);
  }, []);

  const requestReturn = useCallback((orderId: string) => {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        orders: prev.orders.map(o =>
          o.id === orderId ? { ...o, returnRequested: true, status: 'Returned' as const } : o
        ),
      };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, addOrder, requestReturn, lastOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
