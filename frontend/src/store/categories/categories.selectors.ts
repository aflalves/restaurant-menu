import { createFeatureSelector, createSelector, defaultMemoize } from '@ngrx/store'
import { CategoriesWithItems } from 'src/models/category'
import { StateKey } from 'src/models/state'
import { fromItems } from '../items/items.selectors'
import { fromUser } from '../user/user.selectors'
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
      categories.map((category) => ({
        ...category,
        items: itemsByCategory.memoized(category._id),
      })) as CategoriesWithItems[]
  )

  export const nonEmptyCategoriesWithItems = createSelector(categoriesWithItems, (allCategories: CategoriesWithItems[]) =>
    allCategories.filter(({ items }) => items.length > 0)
  )

  /**
   * Returns all categories for the Admin
   * Returns only the categories that have items for the Normal user
   */
  export const categoriesForUI = createSelector(
    categoriesWithItems,
    nonEmptyCategoriesWithItems,
    fromUser.isAdmin,
    (allCategories, nonEmptyCategories, isAdmin) => (isAdmin ? allCategories : nonEmptyCategories)
  )
}
