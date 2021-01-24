import { Item } from 'src/models/item'
import { fromItems } from './items.selectors'

const MOCK_ITEMS: Item[] = [
  {
    _id: '0',
    categoryId: 'cat1',
    price: 10,
    name: 'item 0',
  },
  {
    _id: '1',
    categoryId: 'other category',
    price: 5,
    name: 'item 1',
  },
]

describe('Items Selectors', () => {
  it('should return the fetching flag', () => {
    expect(fromItems.isFetching.projector({ fetching: true })).toEqual(true)
  })

  it('should return the item by id', () => {
    const itemEntities = {
      item1: {
        id: 'item1',
        name: 'X-Bacon',
      },
    }

    const itemById = fromItems.byId.projector(itemEntities).memoized

    expect(itemById('item1')).toEqual(itemEntities.item1)
  })

  describe('isCategoryUsed', () => {
    it('should return true if the category is used by an item', () => {
      const isUsed = fromItems.isCategoryUsed.projector(MOCK_ITEMS).memoized

      expect(isUsed(MOCK_ITEMS[0].categoryId)).toEqual(true)
    })

    it('should return false if the category is in not used by any item', () => {
      const isUsed = fromItems.isCategoryUsed.projector(MOCK_ITEMS).memoized

      expect(isUsed('some-random-cat-not-used')).toEqual(false)
    })
  })

  it('should return the items by the category ID', () => {
    const catById = fromItems.itemsByCategoryId.projector(MOCK_ITEMS).memoized

    expect(catById('other category')).toEqual([MOCK_ITEMS[1]])
  })
})
