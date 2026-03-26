import { products, Product } from '@/data/products';

const K = 5;

type LatentVector = [number, number, number, number, number];

const itemVectors: Record<string, LatentVector> = {
  w1:  [0.9, 0.1, 0.2, 0.3, 0.4],  // Organic Linen Wrap Dress
  w2:  [0.9, 0.1, 0.1, 0.2, 0.6],  // Recycled Cashmere Sweater
  m1:  [0.1, 0.9, 0.2, 0.2, 0.4],  // Hemp Chino Trousers
  m2:  [0.1, 0.9, 0.1, 0.2, 0.3],  // Organic Cotton Oxford Shirt
  a1:  [0.5, 0.3, 0.9, 0.2, 0.3],  // Bamboo Performance Leggings
  a2:  [0.3, 0.5, 0.9, 0.2, 0.4],  // Recycled Polyester Track Jacket
  ac1: [0.4, 0.4, 0.2, 0.9, 0.2],  // Cork & Canvas Tote Bag
  ac2: [0.5, 0.4, 0.3, 0.9, 0.1],  // Upcycled Denim Bucket Hat
};

function dotProduct(a: LatentVector, b: LatentVector): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

/** Build P_u — the user latent vector — by averaging the Q_i vectors of every product the user has purchased.  If no history exists, falls back to a 
 *  balanced neutral vector so the function always returns useful results */
function buildUserVector(purchasedIds: string[]): LatentVector {
  const bought = purchasedIds.filter(id => itemVectors[id]);
  if (bought.length === 0) {
    return [0.5, 0.5, 0.5, 0.5, 0.5];
  }
  const sum: LatentVector = [0, 0, 0, 0, 0];
  for (const id of bought) {
    const v = itemVectors[id];
    for (let k = 0; k < K; k++) sum[k] += v[k];
  }
  return sum.map(v => v / bought.length) as LatentVector;
}

/**
 * Returns up to `topN` recommended products for a user, given a list of product IDs they have already purchased.
 * Excludes already-purchased items and out-of-stock products.
 * Score = P_u · Q_i^T  (matrix factorization dot product)
 */
export function getRecommendations(purchasedIds: string[], topN = 3): Product[] {
  const P_u = buildUserVector(purchasedIds);
  const purchasedSet = new Set(purchasedIds);

  const scored = products
    .filter(p => !purchasedSet.has(p.id) && p.stock > 0)
    .map(p => ({
      product: p,
      score: dotProduct(P_u, itemVectors[p.id] ?? [0.5, 0.5, 0.5, 0.5, 0.5]),
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topN).map(s => s.product);
}
