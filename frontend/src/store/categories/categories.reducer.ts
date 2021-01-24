import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { Category } from 'src/models/category'
import { CategoryActions } from './categories.actions'

export interface CategoryState extends EntityState<Category> {
  fetching: boolean
  error: string
}

export const categoriesAdapter = createEntityAdapter<Category>({
  selectId: (category: Category) => category._id,
})

export const categoryInitialState: CategoryState = categoriesAdapter.getInitialState({
  fetching: false,
  error: null,
})

const reducer = createReducer(
  categoryInitialState,

  // fetch
  on(CategoryActions.requestAllCategories, (state) => ({
    ...state,
    fetching: true,
  })),
  on(CategoryActions.receiveAllCategories, (state, { categories }) =>
    categoriesAdapter.setAll(categories, { ...state, fetching: false })
  ),

  // add
  on(CategoryActions.requestAddCategory, (state) => ({
    ...state,
    fetching: true,
  })),
  on(CategoryActions.addCategorySuccess, (state, { category }) =>
    categoriesAdapter.addOne(category, { ...state, fetching: false })
  ),

  // update
  on(CategoryActions.requestUpdateCategory, (state) => ({
    ...state,
    fetching: true,
  })),
  on(CategoryActions.updateCategorySuccess, (state, { category }) =>
    categoriesAdapter.updateOne(
      { id: category._id, changes: { ...category } },
      { ...state, fetching: false }
    )
  ),

  // delete
  on(CategoryActions.requestDeleteCategory, (state) => ({
    ...state,
    fetching: true,
  })),
  on(CategoryActions.deleteCategorySuccess, (state, { id }) =>
    categoriesAdapter.removeOne(id, { ...state, fetching: false })
  ),

  on(CategoryActions.categoryRequestError, (state, { error }) => ({
    ...state,
    fetching: false,
    error,
  }))
)

export function categoriesReducer(state: CategoryState | undefined, action: Action): CategoryState {
  return reducer(state, action)
}
