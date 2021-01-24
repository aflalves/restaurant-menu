import { fromCategories } from './categories.selectors'

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
})
