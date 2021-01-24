import { Category } from 'src/models/category'
import { CategoryActions } from './categories.actions'
import { categoriesReducer, categoryInitialState, CategoryState } from './categories.reducer'

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

describe('Categories Reducer', () => {
  let initialState: CategoryState

  beforeEach(() => {
    initialState = categoryInitialState
  })

  it('should set the fetching state on multiple actions', () => {
    expect(categoriesReducer(initialState, CategoryActions.requestAllCategories())).toEqual({
      ...initialState,
      fetching: true,
    })

    expect(
      categoriesReducer(initialState, CategoryActions.requestAddCategory({ category: {} }))
    ).toEqual({
      ...initialState,
      fetching: true,
    })

    expect(
      categoriesReducer(
        initialState,
        CategoryActions.requestUpdateCategory({ category: {} as Category })
      )
    ).toEqual({
      ...initialState,
      fetching: true,
    })

    expect(
      categoriesReducer(initialState, CategoryActions.requestDeleteCategory({ id: '1' }))
    ).toEqual({
      ...initialState,
      fetching: true,
    })
  })

  it('should add the categories to the state on receiveAllCategories', () => {
    const newState = categoriesReducer(initialState, CategoryActions.receiveAllCategories({ categories: MOCK_CATEGORIES }))
    const expectedState = {
      ...initialState,
      ids: ['0', '1'],
      entities: {
        0: MOCK_CATEGORIES[0],
        1: MOCK_CATEGORIES[1],
      },
    }

    expect(newState).toEqual(expectedState)
  })

  it('should add category to the state on addCategorySuccess', () => {
    const newState = categoriesReducer(initialState, CategoryActions.addCategorySuccess({ category: MOCK_CATEGORIES[0] }))
    const expectedState = {
      ...initialState,
      ids: ['0'],
      entities: {
        0: MOCK_CATEGORIES[0],
      },
    }

    expect(newState).toEqual(expectedState)
  })

  it('should update category on updateCategorySuccess', () => {
    const stateBefore = {
      ...initialState,
      ids: ['0'],
      entities: {
        0: MOCK_CATEGORIES[0],
      },
    }

    const newState = categoriesReducer(
      stateBefore,
      CategoryActions.updateCategorySuccess({ category: { ...MOCK_CATEGORIES[0], name: 'new-name' } })
    )

    const expectedState = {
      ...initialState,
      ids: ['0'],
      entities: {
        0: {
          _id: '0',
          name: 'new-name',
        },
      },
    }

    expect(newState).toEqual(expectedState)
  })

  it('should remove category on removeCategorySuccess', () => {
    const stateBefore = {
      ...initialState,
      ids: ['0', '1'],
      entities: {
        0: MOCK_CATEGORIES[0],
        1: MOCK_CATEGORIES[1],
      },
    }

    const newState = categoriesReducer(stateBefore, CategoryActions.deleteCategorySuccess({ id: '0' }))

    const expectedState = {
      ...initialState,
      ids: ['1'],
      entities: {
        1: MOCK_CATEGORIES[1],
      },
    }

    expect(newState).toEqual(expectedState)
  })
})
