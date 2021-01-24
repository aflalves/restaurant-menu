import { Item } from './item'

export interface Category {
  _id: string
  name: string
}

export interface CategoriesWithItems extends Category {
  items: Item[]
}
