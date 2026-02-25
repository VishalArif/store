/** Price is stored in PKR (Pakistani Rupees) */
export interface MockProduct {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  imageAlt: string;
  onSale?: boolean;
  slug: string;
  description?: string;
  images?: string[];
  colors?: { name: string; hex: string }[];
  connection?: string[];
}

export const featuredProducts: MockProduct[] = [
  {
    id: "1",
    name: "Studio Pro Wireless Over-Ear",
    slug: "studio-pro-wireless-over-ear",
    price: 83100,
    compareAtPrice: 97000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    imageAlt: "Black over-ear studio headphones",
    onSale: true,
    description:
      "Studio Pro Wireless delivers reference-grade sound with premium drivers and active noise cancellation. Designed for producers and audiophiles who demand clarity and comfort during long sessions. Features plush memory foam earpads and a lightweight frame.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Silver", hex: "#c0c0c0" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    connection: ["Wireless", "Wired"],
  },
  {
    id: "2",
    name: "Noise-Cancel Elite",
    slug: "noise-cancel-elite",
    price: 110900,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    imageAlt: "White wireless noise-cancelling headphones",
    onSale: false,
    description:
      "Industry-leading noise cancellation meets pristine sound. Elite hybrid ANC adapts to your environment, while 30-hour battery life keeps you immersed. Perfect for travel and daily commutes.",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    ],
    colors: [
      { name: "White", hex: "#f5f5f5" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    connection: ["Wireless"],
  },
  {
    id: "3",
    name: "Bass Rush In-Ear",
    slug: "bass-rush-in-ear",
    price: 24700,
    compareAtPrice: 33100,
    image: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600&h=600&fit=crop",
    imageAlt: "In-ear headphones with case",
    onSale: true,
    description:
      "Deep, punchy bass in a compact design. Bass Rush In-Ear features dual drivers and multiple ear tip sizes for a secure fit. The included case provides up to 24 hours of total playback.",
    images: [
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1577174881658-45f0d17a0e73?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop",
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Red", hex: "#c41e3a" },
      { name: "Blue", hex: "#0066b2" },
    ],
    connection: ["Wireless", "Wired"],
  },
  {
    id: "4",
    name: "Gamer X Pro RGB",
    slug: "gamer-x-pro-rgb",
    price: 49800,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop",
    imageAlt: "Gaming headset with microphone",
    onSale: false,
    description:
      "Built for esports. 7.1 surround, detachable noise-cancelling mic, and customizable RGB lighting. Lightweight construction and breathable mesh keep you comfortable during marathon sessions.",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
    ],
    colors: [{ name: "Black", hex: "#1a1a1a" }],
    connection: ["Wireless", "Wired"],
  },
  {
    id: "5",
    name: "Travel Fold Compact",
    slug: "travel-fold-compact",
    price: 41400,
    compareAtPrice: 49800,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
    imageAlt: "Foldable headphones in case",
    onSale: true,
    description:
      "Premium sound that folds into a slim case. Travel Fold Compact offers 20-hour battery, quick charge, and a hard case that fits in any bag. Ideal for commuters and frequent flyers.",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Charcoal", hex: "#36454f" },
    ],
    connection: ["Wireless"],
  },
  {
    id: "6",
    name: "Classic Retro On-Ear",
    slug: "classic-retro-on-ear",
    price: 35900,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    imageAlt: "Vintage style on-ear headphones",
    onSale: false,
    description:
      "Timeless design meets modern drivers. Classic Retro On-Ear delivers warm, balanced sound with a lightweight on-ear fit. Perfect for casual listening and podcast fans.",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1612444530582-fd660332a175?w=800&h=800&fit=crop",
    ],
    colors: [
      { name: "Brown", hex: "#8b4513" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Cream", hex: "#fffdd0" },
    ],
    connection: ["Wired"],
  },
  {
    id: "7",
    name: "Sport Flex Wireless",
    slug: "sport-flex-wireless",
    price: 27500,
    compareAtPrice: 35900,
    image: "https://images.unsplash.com/photo-1577174881658-45f0d17a0e73?w=600&h=600&fit=crop",
    imageAlt: "Sport wireless earbuds",
    onSale: true,
    description:
      "Stay secure during any workout. Sport Flex Wireless features ear hooks and IPX5 water resistance. Dynamic sound and 12-hour battery keep you motivated from run to recovery.",
    images: [
      "https://images.unsplash.com/photo-1577174881658-45f0d17a0e73?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&h=800&fit=crop",
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Blue", hex: "#0066b2" },
      { name: "Green", hex: "#228b22" },
    ],
    connection: ["Wireless"],
  },
  {
    id: "8",
    name: "Monitor Reference Open-Back",
    slug: "monitor-reference-open-back",
    price: 124800,
    image: "https://images.unsplash.com/photo-1612444530582-fd660332a175?w=600&h=600&fit=crop",
    imageAlt: "Open-back reference headphones",
    onSale: false,
    description:
      "Studio reference headphones for mixing and mastering. Open-back design provides a natural, spacious soundstage. Hand-built drivers and premium materials for the most demanding listeners.",
    images: [
      "https://images.unsplash.com/photo-1612444530582-fd660332a175?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    ],
    colors: [{ name: "Black", hex: "#1a1a1a" }],
    connection: ["Wired"],
  },
];

export const allProducts: MockProduct[] = [...featuredProducts];

export function getProductBySlug(slug: string): MockProduct | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(productId: string, limit = 4): MockProduct[] {
  return allProducts.filter((p) => p.id !== productId).slice(0, limit);
}

export function searchProducts(query: string): MockProduct[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
  );
}
