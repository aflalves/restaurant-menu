import { createAction, props } from '@ngrx/store'
import { Category } from 'src/models/category'
import { StateKey } from 'src/models/state'

const STORE = StateKey.CATEGORIES

export namespace CategoryActions {
  export const requestAllCategories = createAction(`[${STORE}] Request All`)

  export const receiveAllCategories = createAction(
    `[${STORE}] Receive All`,
    props<{ categories: Category[] }>()
  )

  export const requestAddCategory = createAction(
    `[${STORE}] Request Add one Category`,
    props<{ category: Partial<Category> }>()
  )

  export const addCategorySuccess = createAction(
    `[${STORE}] Add one Category to the Store`,
    props<{ category: Category }>()
  )

  export const requestDeleteCategory = createAction(
    `[${STORE}] Request Delete one Category`,
    props<{ id: string }>()
  )

  export const deleteCategorySuccess = createAction(
    `[${STORE}] Delete one Category from the store`,
    props<{ id: string }>()
  )

  export const requestUpdateCategory = createAction(
    `[${STORE}] Request Update`,
    props<{ category: Category }>()
  )

  export const updateCategorySuccess = createAction(
    `[${STORE}] Update one`,
    props<{ category: Category }>()
  )

  export const categoryRequestError = createAction(`[${STORE}] Request Error`, props<{ error: any }>())
}
