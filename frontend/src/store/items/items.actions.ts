import { createAction, props } from '@ngrx/store'
import { Item } from 'src/models/item'
import { StateKey } from 'src/models/state'

const STORE = StateKey.ITEMS

export namespace ItemActions {
  export const requestAllItems = createAction(`[${STORE}] Request All`)

  export const receiveAllItems = createAction(
    `[${STORE}] Receive All`,
    props<{ items: Item[] }>()
  )

  export const requestAddItem = createAction(
    `[${STORE}] Request Add one Item`,
    props<{ item: Partial<Item> }>()
  )

  export const addItemSuccess = createAction(
    `[${STORE}] Add one Item to the Store`,
    props<{ item: Item }>()
  )

  export const requestDeleteItem = createAction(
    `[${STORE}] Request Delete one Item`,
    props<{ id: string }>()
  )

  export const deleteItemSuccess = createAction(
    `[${STORE}] Delete one Item from the store`,
    props<{ id: string }>()
  )

  export const requestUpdateItem = createAction(
    `[${STORE}] Request Update`,
    props<{ item: Item }>()
  )

  export const updateItemSuccess = createAction(
    `[${STORE}] Update one`,
    props<{ item: Item }>()
  )

  export const itemRequestError = createAction(`[${STORE}] Request Error`, props<{ error: any }>())
}
