import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Add it to .env");
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter,
  log: ["error", "warn"],
});

const demoProducts = [
  {
    name: "Studio Pro Wireless Over-Ear",
    slug: "studio-pro-wireless-over-ear",
    price: 83100,
    compareAtPrice: 97000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    imageAlt: "Black over-ear studio headphones",
    onSale: true,
    featured: true,
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
    name: "Noise-Cancel Elite",
    slug: "noise-cancel-elite",
    price: 110900,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    imageAlt: "White wireless noise-cancelling headphones",
    onSale: false,
    featured: true,
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
    name: "Bass Rush In-Ear",
    slug: "bass-rush-in-ear",
    price: 24700,
    compareAtPrice: 33100,
    image: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600&h=600&fit=crop",
    imageAlt: "In-ear headphones with case",
    onSale: true,
    featured: true,
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
    name: "Gamer X Pro RGB",
    slug: "gamer-x-pro-rgb",
    price: 49800,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop",
    imageAlt: "Gaming headset with microphone",
    onSale: false,
    featured: true,
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
    name: "Travel Fold Compact",
    slug: "travel-fold-compact",
    price: 41400,
    compareAtPrice: 49800,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
    imageAlt: "Foldable headphones in case",
    onSale: true,
    featured: true,
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
    name: "Classic Retro On-Ear",
    slug: "classic-retro-on-ear",
    price: 35900,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    imageAlt: "Vintage style on-ear headphones",
    onSale: false,
    featured: true,
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
    name: "Sport Flex Wireless",
    slug: "sport-flex-wireless",
    price: 27500,
    compareAtPrice: 35900,
    image: "https://images.unsplash.com/photo-1577174881658-45f0d17a0e73?w=600&h=600&fit=crop",
    imageAlt: "Sport wireless earbuds",
    onSale: true,
    featured: true,
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
    name: "Monitor Reference Open-Back",
    slug: "monitor-reference-open-back",
    price: 124800,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1612444530582-fd660332a175?w=600&h=600&fit=crop",
    imageAlt: "Open-back reference headphones",
    onSale: false,
    featured: true,
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

const ADMIN_EMAIL = "admin@email.com";
const ADMIN_PASSWORD = "Password1@";

async function main() {
  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    create: {
      email: ADMIN_EMAIL,
      passwordHash: adminHash,
      role: "admin",
      name: "Admin",
    },
    update: { passwordHash: adminHash, role: "admin" },
  });
  console.log("Seeded admin user:", ADMIN_EMAIL);

  for (const p of demoProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        name: p.name,
        slug: p.slug,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? undefined,
        image: p.image,
        imageAlt: p.imageAlt,
        onSale: p.onSale,
        featured: p.featured,
        description: p.description ?? undefined,
        images: p.images,
        colors: p.colors,
        connection: p.connection,
      },
      update: {
        name: p.name,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? undefined,
        image: p.image,
        imageAlt: p.imageAlt,
        onSale: p.onSale,
        featured: p.featured,
        description: p.description ?? undefined,
        images: p.images,
        colors: p.colors,
        connection: p.connection,
      },
    });
  }
  console.log("Seeded", demoProducts.length, "products.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
