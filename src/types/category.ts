export interface CategoryType {
  name: string;
  image: string;
  id: string;
}

export interface CategoryResponse {
  message: string;
  categories: CategoryType[];
}

export interface Limit {
  id: string;
  price: number;
  category: {
    name: string;
    image: string;
  };
  categoryId: string;
}
