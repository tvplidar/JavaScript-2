'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: number;
  pro_name: string;
  price: number;
  cat_id: number;
  create_date: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const res = await fetch('http://localhost:3001/api/products', {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? 'Fetch error');
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);
  
}
