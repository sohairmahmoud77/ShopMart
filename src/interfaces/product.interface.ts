// 

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// 
export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  category: Category | { name: string }; 
  
  id?: string; 
  slug?: string;
  description?: string;
  quantity?: number;
  brand?: Brand;
}

export interface BrandResponse {
  data: Brand[];
}

export interface ProductResponse {
  data: Product[];
}