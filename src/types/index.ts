export interface Product {
  id: string;
  name: string;
  price: number;
  category: string; // Top-level door category: 'Pivot Doors', 'Concealed & Flush Doors', 'Sliding Glass Partitions', 'Armored Security Doors', 'Bespoke Wood Doors', 'Architectural Hardware'
  subCategory: string; // Specific line/sub-style
  description: string;
  specifications?: string;
  images: string[];
  featured: boolean;
  available: boolean;
  
  // Architectural Door Specifications & Options
  materialType?: string;
  finishOptions?: string[];
  openingMechanism?: string;
  maxDimensions?: string;
  hardwareType?: string;
  securityGrade?: string;
  leadTime?: string;
  cadAvailable?: boolean;

  // Legacy/Compatibility fields
  sizes?: string[];
  colors?: string[];
  lightingTemperatures?: string[];
  voltageRating?: string;
  thickness?: string;
  usageType?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish?: string;
  customDimensions?: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  name: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  location: string;
  year: string;
  doorType: string;
  architect?: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  featuredProductIds?: string[];
}
