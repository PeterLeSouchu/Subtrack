export interface CategoryType {
  name: string;
  image: string;
  id: string;
}

export interface CategoryResponse {
  message: string;
  categories: CategoryType[];
}
