import buckethat from '@/assets/buckethat.jpeg';
import cashmere from '@/assets/cashmere.webp';
import orglinendress from '@/assets/orglinendress.jpeg';
import tote from '@/assets/tote.jpeg';
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'women' | 'men' | 'activewear' | 'accessories';
  description: string;
  sustainabilityInfo: string;
  material: string;
  sizes: string[];
  stock: number;
  color: string;
  image?: string;
  estimatedDelivery: string;
  clickCollectAvailable: boolean;
}

export const products: Product[] = [
  {
    id: 'w1',
    name: 'Organic Linen Wrap Dress',
    price: 89.99,
    category: 'women',
    description: 'Elegant wrap dress crafted from 100% organic linen, perfect for warm days and conscious wardrobes.',
    sustainabilityInfo: 'Made from GOTS-certified organic linen. Zero-waste pattern cutting reduces fabric waste by 15%.',
    material: '100% Organic Linen',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 12,
    color: 'hsl(145, 30%, 80%)',
    image: orglinendress,
    estimatedDelivery: '3-5 business days',
    clickCollectAvailable: true,
  },
  {
    id: 'w2',
    name: 'Recycled Cashmere Sweater',
    price: 129.99,
    category: 'women',
    description: 'Luxuriously soft sweater made from 100% recycled cashmere, giving new life to premium fibres.',
    sustainabilityInfo: 'Crafted from post-consumer recycled cashmere. Saves 60% water compared to virgin cashmere production.',
    material: '100% Recycled Cashmere',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 8,
    color: 'hsl(35, 40%, 85%)',
    image: cashmere,
    estimatedDelivery: '3-5 business days',
    clickCollectAvailable: true,
  },
  {
    id: 'm1',
    name: 'Hemp Chino Trousers',
    price: 79.99,
    category: 'men',
    description: 'Classic chinos reimagined with sustainable hemp blend fabric. Durable, breathable, and eco-friendly.',
    sustainabilityInfo: 'Hemp requires 50% less water than cotton. Naturally pest-resistant, grown without pesticides.',
    material: '55% Hemp, 45% Organic Cotton',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 15,
    color: 'hsl(25, 25%, 75%)',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop',
    estimatedDelivery: '3-5 business days',
    clickCollectAvailable: true,
  },
  {
    id: 'm2',
    name: 'Organic Cotton Oxford Shirt',
    price: 64.99,
    category: 'men',
    description: 'Timeless Oxford shirt in organic cotton. Perfect for both casual and smart occasions.',
    sustainabilityInfo: 'GOTS-certified organic cotton. Fair Trade certified production facility in Portugal.',
    material: '100% Organic Cotton',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 20,
    color: 'hsl(200, 15%, 88%)',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop',
    estimatedDelivery: '2-4 business days',
    clickCollectAvailable: true,
  },
  {
    id: 'a1',
    name: 'Bamboo Performance Leggings',
    price: 54.99,
    category: 'activewear',
    description: 'High-performance leggings with bamboo-derived fabric. Moisture-wicking and naturally antibacterial.',
    sustainabilityInfo: 'Bamboo grows rapidly without irrigation. Fabric is biodegradable at end of life.',
    material: '70% Bamboo Viscose, 30% Recycled Spandex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 25,
    color: 'hsl(160, 20%, 70%)',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&auto=format&fit=crop',
    estimatedDelivery: '2-4 business days',
    clickCollectAvailable: true,
  },
  {
    id: 'a2',
    name: 'Recycled Polyester Track Jacket',
    price: 74.99,
    category: 'activewear',
    description: 'Lightweight track jacket made from recycled ocean plastic. Performance meets planet-friendly design.',
    sustainabilityInfo: 'Each jacket repurposes 12 plastic bottles from ocean cleanup. Bluesign® certified.',
    material: '100% Recycled Polyester',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 3,
    color: 'hsl(152, 25%, 65%)',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop',
    estimatedDelivery: '3-5 business days',
    clickCollectAvailable: false,
  },
  {
    id: 'ac1',
    name: 'Cork & Canvas Tote Bag',
    price: 45.99,
    category: 'accessories',
    description: 'Versatile tote combining sustainably harvested cork with organic canvas. Spacious and stylish.',
    sustainabilityInfo: 'Cork harvested without harming trees. Canvas is organic and undyed to reduce chemical use.',
    material: 'Natural Cork, Organic Canvas',
    sizes: ['One Size'],
    stock: 18,
    color: 'hsl(30, 35%, 78%)',
    image: tote,
    estimatedDelivery: '2-4 business days',
    clickCollectAvailable: true,
  },
  {
    id: 'ac2',
    name: 'Upcycled Denim Bucket Hat',
    price: 29.99,
    category: 'accessories',
    description: 'Unique bucket hat crafted from upcycled denim. Each piece is one-of-a-kind.',
    sustainabilityInfo: 'Made from pre-consumer denim waste. Saves 1,500 litres of water per hat vs new denim.',
    material: '100% Upcycled Denim',
    sizes: ['S/M', 'L/XL'],
    stock: 0,
    color: 'hsl(215, 20%, 72%)',
    image: buckethat,
    estimatedDelivery: '5-7 business days',
    clickCollectAvailable: false,
  },
];

export const getProductsByCategory = (category: string) =>
  category === 'all' ? products : products.filter(p => p.category === category);

export const getProductById = (id: string) => products.find(p => p.id === id);
