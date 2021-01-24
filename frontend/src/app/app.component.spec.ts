import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatToolbar } from '@angular/material/toolbar'
import { By } from '@angular/platform-browser'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Item } from 'src/models/item'
import { AppState } from 'src/store/app.store'
import { fromCategories } from 'src/store/categories/categories.selectors'
import { fromGlobal } from 'src/store/global.selectors'
import { UserActions } from 'src/store/user/user.actions'
import { fromUser } from 'src/store/user/user.selectors'
import { AppComponent } from './app.component'
import { AppModule } from './app.module'

const MOCK_ITEMS: Item[] = [
  {
    _id: 'item id 0',
    categoryId: '0',
    price: 10,
    name: 'item 0',
    description: 'the item description...',
  },
  {
    _id: 'item id 1',
    categoryId: '1',
    price: 5,
    name: 'item 1',
  },
  {
    _id: 'item id 2',
    categoryId: '1',
    price: 5,
    name: 'item 2',
  },
]

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let mockStore: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance

    mockStore = TestBed.inject(Store) as MockStore<AppState>
    mockStore.overrideSelector(fromGlobal.isFetching, false)
    mockStore.overrideSelector(fromUser.isAdmin, false)
    mockStore.overrideSelector(fromCategories.categoriesForUI, [])
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should not show the admin-toolbar when user is normal', () => {
    const toolbar = fixture.debugElement.query(By.directive(MatToolbar))
    expect(toolbar).toBeFalsy()
  })

  it('should show the admin-toolbar when user is admin', () => {
    mockStore.overrideSelector(fromUser.isAdmin, true)
    mockStore.setState({} as AppState)
    fixture.detectChanges()

    const toolbar = fixture.debugElement.query(By.directive(MatToolbar))
    expect(toolbar).toBeTruthy()
  })

  it('should list 2 categories', () => {
    mockStore.overrideSelector(fromCategories.categoriesForUI, [
      { _id: '0', name: 'cat 1', items: MOCK_ITEMS },
      { _id: '1', name: 'cat 2', items: MOCK_ITEMS },
    ])
    mockStore.setState({} as AppState)
    fixture.detectChanges()

    const categories = fixture.debugElement.queryAll(By.css('.category'))
    expect(categories.length).toEqual(2)
  })

  it('should list the category name', () => {
    mockStore.overrideSelector(fromCategories.categoriesForUI, [
      { _id: '0', name: 'cat 1', items: MOCK_ITEMS },
    ])
    mockStore.setState({} as AppState)
    fixture.detectChanges()

    const catName = fixture.debugElement.query(By.css('.category-name')).nativeElement
    expect(catName.textContent).toEqual('CAT 1')
  })

  it('should list 2 items', () => {
    mockStore.overrideSelector(fromCategories.categoriesForUI, [
      { _id: '0', name: 'cat 1', items: MOCK_ITEMS },
    ])
    mockStore.setState({} as AppState)
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.css('.item-name'))
    expect(items.length).toEqual(3)
  })

  it('should have the item name, price and description', () => {
    mockStore.overrideSelector(fromCategories.categoriesForUI, [
      { _id: '0', name: 'cat 1', items: MOCK_ITEMS },
    ])
    mockStore.setState({} as AppState)
    fixture.detectChanges()

    const item = fixture.debugElement.query(By.css('.item-name')).nativeElement
    const itemDesc = fixture.debugElement.query(By.css('.item-description')).nativeElement
    expect(item.textContent).toEqual('ITEM 0 - €10.00')
    expect(itemDesc.textContent).toEqual('the item description...')
  })

  it('should dispatch the action to toggle the user mode', () => {
    mockStore.overrideSelector(fromUser.isAdmin, true)
    mockStore.setState({} as AppState)
    fixture.detectChanges()

    const spy = spyOn(mockStore, 'dispatch')

    const toolbarActions = fixture.debugElement.query(By.css('.admin-actions'))
    const switchModeButotn: HTMLButtonElement = toolbarActions.nativeElement.children[2]

    switchModeButotn.click()
    fixture.detectChanges()

    expect(spy).toHaveBeenCalledWith(UserActions.setNormalUser())
  })
})
