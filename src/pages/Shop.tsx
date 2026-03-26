import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInventory } from '@/contexts/InventoryContext';
import { useAuth } from '@/contexts/AuthContext';
import { getRecommendations } from '@/utils/recommendations';
import ProductCard from '@/components/ProductCard';
import { Sparkles } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
  { value: 'activewear', label: 'Activewear' },
  { value: 'accessories', label: 'Accessories' },
];

const nameToId: Record<string, string> = {
  'Organic Linen Wrap Dress': 'w1',
  'Recycled Cashmere Sweater': 'w2',
  'Hemp Chino Trousers': 'm1',
  'Organic Cotton Oxford Shirt': 'm2',
  'Bamboo Performance Leggings': 'a1',
  'Recycled Polyester Track Jacket': 'a2',
  'Cork & Canvas Tote Bag': 'ac1',
  'Upcycled Denim Bucket Hat': 'ac2',
};

export default function Shop() {
  const { products } = useInventory();
  const { isAuthenticated, user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleCategory = (value: string) => {
    setActiveCategory(value);
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  const purchasedIds = isAuthenticated && user
    ? user.orders.flatMap(o => o.items.map(i => nameToId[i.name] ?? '').filter(Boolean))
    : [];
  const recommendations = isAuthenticated ? getRecommendations(purchasedIds, 4) : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-3">Shop Our Collection</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Sustainably made fashion for every occasion. Check in-store availability at any of our boutiques.
        </p>
      </div>

      {/* Personalised recommendations — visible to logged-in users only */}
      {isAuthenticated && recommendations.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-xl font-semibold text-foreground">Recommended for You</h2>
            <span className="text-xs text-muted-foreground ml-1">based on your purchase history</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <hr className="mt-10 border-border" />
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => handleCategory(cat.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No products found in this category.</p>
      )}
    </div>
  );
}
