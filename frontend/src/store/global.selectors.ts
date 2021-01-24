import { createSelector } from '@ngrx/store'
import { fromCategories } from './categories/categories.selectors'
import { fromItems } from './items/items.selectors'

export namespace fromGlobal {
  export const isFetching = createSelector(
    fromCategories.isFetching,
    fromItems.isFetching,
    (f1, f2) => f1 || f2
  )
}
