import { Item } from 'src/models/item'
import { ItemActions } from './items.actions'
import { itemInitialState, itemsReducer, ItemState } from './items.reducer'

const MOCK_ITEMS: Item[] = [
  {
    _id: '0',
    categoryId: 'cat1',
    price: 10,
    name: 'item 0',
  },
  {
    _id: '1',
    categoryId: 'cat1',
    price: 5,
    name: 'item 1',
  },
]

describe('Items Reducer', () => {
  let initialState: ItemState

  beforeEach(() => {
    initialState = itemInitialState
  })

  it('should set the fetching state on multiple actions', () => {
    expect(itemsReducer(initialState, ItemActions.requestAllItems())).toEqual({
      ...initialState,
      fetching: true,
    })

    expect(itemsReducer(initialState, ItemActions.requestAddItem({ item: MOCK_ITEMS[0] }))).toEqual(
      {
        ...initialState,
        fetching: true,
      }
    )

    expect(
      itemsReducer(initialState, ItemActions.requestUpdateItem({ item: MOCK_ITEMS[0] }))
    ).toEqual({
      ...initialState,
      fetching: true,
    })

    expect(
      itemsReducer(initialState, ItemActions.requestDeleteItem({ id: MOCK_ITEMS[0]._id }))
    ).toEqual({
      ...initialState,
      fetching: true,
    })
  })

  it('should add the items to the state on receiveAllItems', () => {
    const newState = itemsReducer(initialState, ItemActions.receiveAllItems({ items: MOCK_ITEMS }))
    const expectedState = {
      ...initialState,
      ids: ['0', '1'],
      entities: {
        0: MOCK_ITEMS[0],
        1: MOCK_ITEMS[1],
      },
    }

    expect(newState).toEqual(expectedState)
  })

  it('should add item to the state on addItemSuccess', () => {
    const newState = itemsReducer(initialState, ItemActions.addItemSuccess({ item: MOCK_ITEMS[0] }))
    const expectedState = {
      ...initialState,
      ids: ['0'],
      entities: {
        0: MOCK_ITEMS[0],
      },
    }

    expect(newState).toEqual(expectedState)
  })

  it('should update item on updateItemSuccess', () => {
    const stateBefore = {
      ...initialState,
      ids: ['0'],
      entities: {
        0: MOCK_ITEMS[0],
      },
    }

    const newState = itemsReducer(
      stateBefore,
      ItemActions.updateItemSuccess({ item: { ...MOCK_ITEMS[0], name: 'new-name' } })
    )

    const expectedState = {
      ...initialState,
      ids: ['0'],
      entities: {
        0: {
          _id: '0',
          categoryId: 'cat1',
          price: 10,
          name: 'new-name',
        },
      },
    }

    expect(newState).toEqual(expectedState)
  })

  it('should remove item on removeItemSuccess', () => {
    const stateBefore = {
      ...initialState,
      ids: ['0', '1'],
      entities: {
        0: MOCK_ITEMS[0],
        1: MOCK_ITEMS[1],
      },
    }

    const newState = itemsReducer(stateBefore, ItemActions.deleteItemSuccess({ id: '0' }))

    const expectedState = {
      ...initialState,
      ids: ['1'],
      entities: {
        1: MOCK_ITEMS[1],
      },
    }

    expect(newState).toEqual(expectedState)
  })
})
