export type Category = {
  id: string,
  name: string
}

export type CategoryState = {
  categories: Category[];
  selected: Category | null;
  loading: boolean;
};