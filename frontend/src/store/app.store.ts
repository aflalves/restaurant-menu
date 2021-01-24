import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from 'src/environments/environment'
import { StateKey } from 'src/models/state'
import { CategoriesEffects } from './categories/categories.effects'
import { categoriesReducer, CategoryState } from './categories/categories.reducer'
import { ItemsEffects } from './items/items.effects'
import { itemsReducer, ItemState } from './items/items.reducer'
import { logger } from './logger.meta.reducer'
import { userReducer, UserState } from './user/user.reducer'

export interface AppState {
  [StateKey.USER]: UserState
  [StateKey.CATEGORIES]: CategoryState
  [StateKey.ITEMS]: ItemState
}

export const reducers: ActionReducerMap<AppState> = {
  [StateKey.USER]: userReducer,
  [StateKey.CATEGORIES]: categoriesReducer,
  [StateKey.ITEMS]: itemsReducer,
}

export const effects = [CategoriesEffects, ItemsEffects]

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : []
