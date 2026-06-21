export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  color: string;
  categoryId: number;
  createdAt: string;
  photo?: {
    id: number;
    filename: string;
    mimetype: string;
    blob?: string
  };
};

export type ProductFormData = {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  color: string;
  categoryId: number;
  file?: File;
};