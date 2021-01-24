import { createFeatureSelector, createSelector, defaultMemoize } from '@ngrx/store'
import { StateKey } from 'src/models/state'
import { fromItems } from '../items/items.selectors'
import { categoriesAdapter, CategoryState } from './categories.reducer'

export namespace fromCategories {
  const state = createFeatureSelector<CategoryState>(StateKey.CATEGORIES)

  export const { selectIds, selectEntities, selectAll } = categoriesAdapter.getSelectors(state)

  export const byId = createSelector(selectEntities, (entities) =>
    defaultMemoize((id) => entities[id])
  )

  export const isFetching = createSelector(state, (s) => s.fetching)

  export const categoriesWithItems = createSelector(
    selectAll,
    fromItems.itemsByCategoryId,
    (categories, itemsByCategory) => 
  )
}
