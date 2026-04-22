export type Product = {
  id: string
  description: string,
  price: string,
  picture: string,
  color: string,
  quantity: string,
  category: ProductCategory
}

export type ProductCategory = {
  id: string,
  name: string
}