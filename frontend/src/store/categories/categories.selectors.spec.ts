import { Category } from 'src/models/category'
import { Item } from 'src/models/item'
import { fromCategories } from './categories.selectors'

const MOCK_CATEGORIES: Category[] = [
  {
    _id: '0',
    name: 'cat 0',
  },
  {
    _id: '1',
    name: 'cat 1',
  },
]

const MOCK_ITEMS: Item[] = [
  {
    _id: 'item 0',
    categoryId: '0',
    price: 10,
    name: 'item 0',
  },
  {
    _id: 'item 1',
    categoryId: '1',
    price: 5,
    name: 'item 1',
  },
]

describe('Categories Selectors', () => {
  it('should return the fetching flag', () => {
    expect(fromCategories.isFetching.projector({ fetching: true })).toEqual(true)
  })

  it('should return the category by id', () => {
    const categoriesEntities = {
      category1: {
        id: 'category1',
        name: 'Pizzas',
      },
    }

    const categoryById = fromCategories.byId.projector(categoriesEntities).memoized

    expect(categoryById('category1')).toEqual(categoriesEntities.category1)
  })

  it('should return the categories with the items', () => {
    const itemsByCatMock = { memoized: () => MOCK_ITEMS }

    const catWithItems = fromCategories.categoriesWithItems.projector(
      MOCK_CATEGORIES,
      itemsByCatMock
    )

    expect(catWithItems).toEqual([
      ({ _id: '0', name: 'cat 0', items: MOCK_ITEMS }),
      ({ _id: '1', name: 'cat 1', items: MOCK_ITEMS }),
    ])
  })

  it('should return the categories tht have at least one item', () => {
    expect(fromCategories.nonEmptyCategoriesWithItems.projector(
      [
        ({ _id: '0', name: 'cat 0', items: MOCK_ITEMS }),
        ({ _id: '1', name: 'cat 1', items: [] }),
      ],
    )).toEqual([{ _id: '0', name: 'cat 0', items: MOCK_ITEMS }])
  })
})
