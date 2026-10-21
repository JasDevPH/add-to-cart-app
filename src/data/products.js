// Static product catalog. Each product has a stable `id` used as the React key
// and as the identity when adding/removing items in the cart. `icon` is a
// Feather icon name used only for the product tile illustration.
export const PRODUCTS = [
  {
    id: 'p1',
    productName: 'Wireless Earbuds',
    description: 'Bluetooth 5.3 earbuds with noise cancellation and 24h battery.',
    price: 1499,
    icon: 'headphones',
  },
  {
    id: 'p2',
    productName: 'Smart Watch',
    description: 'Fitness tracking, heart-rate monitor and sleep insights.',
    price: 2999,
    icon: 'watch',
  },
  {
    id: 'p3',
    productName: 'Power Bank 20000mAh',
    description: 'Fast-charging USB-C power bank for phones and tablets.',
    price: 1199,
    icon: 'battery-charging',
  },
  {
    id: 'p4',
    productName: 'Mechanical Keyboard',
    description: 'Compact 75% layout with hot-swappable switches and RGB.',
    price: 3499,
    icon: 'command',
  },
  {
    id: 'p5',
    productName: 'USB-C Hub',
    description: '6-in-1 hub with HDMI 4K, SD card reader and 100W PD.',
    price: 899,
    icon: 'cpu',
  },
  {
    id: 'p6',
    productName: 'Laptop Stand',
    description: 'Adjustable aluminum stand for better posture and airflow.',
    price: 749,
    icon: 'monitor',
  },
];
