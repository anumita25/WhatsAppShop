import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type OrderStatus = 'New' | 'Confirmed' | 'Packed' | 'Delivered';
export type Order = { id: string; name: string; item: string; product: string; quantity: number; total: string; status: OrderStatus; received: string };
export type Product = { name: string; variant: string; stock: number };

const initialOrders: Order[] = [
  { id: '#1048', name: 'Priya Nair', item: 'Linen co-ord set · Sand · M', product: 'Linen co-ord set', quantity: 2, total: '₹2,490', status: 'New', received: '10 min ago' },
  { id: '#1047', name: 'Maya Boutique', item: 'Classic tote × 4 · Black', product: 'Canvas tote', quantity: 4, total: '₹5,600', status: 'Confirmed', received: 'today' },
  { id: '#1046', name: 'Ananya Rao', item: 'Summer dress · Coral · S', product: 'Summer dress', quantity: 1, total: '₹1,890', status: 'Packed', received: 'today' },
  { id: '#1045', name: 'Kavya Sharma', item: 'Everyday kurta · Ivory · L', product: 'Everyday kurta', quantity: 1, total: '₹1,650', status: 'Delivered', received: 'today' },
];

const initialProducts: Product[] = [
  { name: 'Canvas tote', variant: 'Natural · Standard', stock: 4 },
  { name: 'Everyday kurta', variant: 'Ivory · L', stock: 2 },
  { name: 'Linen co-ord set', variant: 'Sand · M', stock: 8 },
  { name: 'Summer dress', variant: 'Coral · S', stock: 18 },
];

type Store = { orders: Order[]; products: Product[]; addOrder: (input: { name: string; product: string; quantity: number; variant: string }) => void; advanceStatus: (id: string) => void };
const ShopContext = createContext<Store | null>(null);
const statuses: OrderStatus[] = ['New', 'Confirmed', 'Packed', 'Delivered'];

export function ShopProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(initialProducts);
  const value = useMemo<Store>(() => ({
    orders,
    products,
    addOrder: ({ name, product, quantity, variant }) => {
      const safeQuantity = Math.max(1, quantity || 1);
      const customer = name.trim() || 'Walk-in customer';
      const productName = product.trim() || 'Custom order';
      const order: Order = { id: `#${1049 + orders.length - initialOrders.length}`, name: customer, product: productName, quantity: safeQuantity, item: `${productName} · ${variant.trim() || 'Variant to confirm'}`, total: '₹—', status: 'New', received: 'just now' };
      setOrders((current) => [order, ...current]);
      setProducts((current) => current.map((item) => item.name.toLowerCase() === productName.toLowerCase() ? { ...item, stock: Math.max(0, item.stock - safeQuantity) } : item));
    },
    advanceStatus: (id) => setOrders((current) => current.map((order) => {
      if (order.id !== id) return order;
      const next = statuses[Math.min(statuses.indexOf(order.status) + 1, statuses.length - 1)];
      return { ...order, status: next };
    })),
  }), [orders, products]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
export function useShop() { const store = useContext(ShopContext); if (!store) throw new Error('useShop must be used within ShopProvider'); return store; }
export function toneForStatus(status: OrderStatus) { return status === 'New' ? 'orange' : status === 'Confirmed' ? 'blue' : status === 'Packed' ? 'green' : 'gray'; }
