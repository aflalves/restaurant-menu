import { createFeatureSelector, createSelector, defaultMemoize } from '@ngrx/store'
import { StateKey } from 'src/models/state'
import { itemsAdapter, ItemState } from './items.reducer'

export namespace fromItems {
  const state = createFeatureSelector<ItemState>(StateKey.ITEMS)

  export const { selectIds, selectEntities, selectAll } = itemsAdapter.getSelectors(state)

  export const byId = createSelector(selectEntities, (entities) =>
    defaultMemoize((id) => entities[id])
  )

  export const isFetching = createSelector(state, (s) => s.fetching)

  export const itemsByCategoryId = createSelector(selectAll, (items) =>
    defaultMemoize((catId: string) => items.filter(({ categoryId }) => catId === categoryId))
  )

  export const isCategoryUsed = createSelector(selectAll, (items) =>
    defaultMemoize((id: string) => items.some(({ categoryId }) => categoryId === id))
  )
}
