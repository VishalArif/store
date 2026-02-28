/** Price in PKR. Shared between server (lib/products) and client (API response, components). */
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  imageAlt: string;
  onSale: boolean;
  description?: string;
  images?: string[];
  colors?: { name: string; hex: string }[];
  connection?: string[];
  featured?: boolean;
}
