export type GenderCategory = "men" | "women" | "unisex";
export type ProductCategory = "running" | "lifestyle" | "sneakers";
export type ProductCollection = "velocity" | "form" | "arc" | "studio";
export type ProductBadge = "NEW" | "BEST SELLER" | "SALE" | "LIMITED";
export interface ProductColor { id: string; name: string; hex: `#${string}`; accent: `#${string}`; }
export interface ProductSize { value: number; label: string; inStock: boolean; }
export interface ProductVariant { id: string; sku: string; color: ProductColor; sizes: ProductSize[]; }
export interface Product { id:string;slug:string;name:string;modelCode:string;subtitle:string;description:string;category:ProductCategory;gender:GenderCategory;collection:ProductCollection;price:number;compareAtPrice?:number;currency:"USD";isNew:boolean;isFeatured:boolean;isBestSeller:boolean;isSale:boolean;isLimited?:boolean;rating:number;reviewCount:number;tags:string[];variants:ProductVariant[];createdAt:string; }
export interface Collection { id: string; slug: string; name: string; description: string; productIds: string[]; }
export type FilterKey = "category" | "gender" | "size" | "color" | "collection" | "availability" | "price";
export type ProductFilters = Partial<Record<FilterKey, string[]>>;
export type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "rating";
