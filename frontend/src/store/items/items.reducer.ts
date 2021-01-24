import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { Item } from 'src/models/item'
import { ItemActions } from './items.actions'

export interface ItemState extends EntityState<Item> {
  fetching: boolean
  error: string
}

export const itemsAdapter = createEntityAdapter<Item>({
  selectId: (item: Item) => item._id,
})

export const itemInitialState: ItemState = itemsAdapter.getInitialState({
  fetching: false,
  error: null,
})

const reducer = createReducer(
  itemInitialState,

  // fetch
  on(ItemActions.requestAllItems, (state) => ({
    ...state,
    fetching: true,
  })),
  on(ItemActions.receiveAllItems, (state, { items }) =>
    itemsAdapter.setAll(items, { ...state, fetching: false })
  ),

  // add
  on(ItemActions.requestAddItem, (state) => ({
    ...state,
    fetching: true,
  })),
  on(ItemActions.addItemSuccess, (state, { item }) =>
    itemsAdapter.addOne(item, { ...state, fetching: false })
  ),

  // update
  on(ItemActions.requestUpdateItem, (state) => ({
    ...state,
    fetching: true,
  })),
  on(ItemActions.updateItemSuccess, (state, { item }) =>
    itemsAdapter.updateOne({ id: item._id, changes: { ...item } }, { ...state, fetching: false })
  ),

  // delete
  on(ItemActions.requestDeleteItem, (state) => ({
    ...state,
    fetching: true,
  })),
  on(ItemActions.deleteItemSuccess, (state, { id }) =>
    itemsAdapter.removeOne(id, { ...state, fetching: false })
  )
)

export function itemsReducer(state: ItemState | undefined, action: Action): ItemState {
  return reducer(state, action)
}
