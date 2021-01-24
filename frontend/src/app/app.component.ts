import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { CategoryDialogComponent } from 'src/lib/category-dialog/category-dialog.component'
import { ItemDialogComponent } from 'src/lib/item-dialog/item-dialog.component'
import { CategoriesWithItems, Category } from 'src/models/category'
import { Item } from 'src/models/item'
import { EnableAdminService } from 'src/services/enable-admin.service'
import { AppState } from 'src/store/app.store'
import { CategoryActions } from 'src/store/categories/categories.actions'
import { fromCategories } from 'src/store/categories/categories.selectors'
import { fromGlobal } from 'src/store/global.selectors'
import { ItemActions } from 'src/store/items/items.actions'
import { fromItems } from 'src/store/items/items.selectors'
import { UserActions } from 'src/store/user/user.actions'
import { fromUser } from 'src/store/user/user.selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Brazilian Grill Berlin'

  isLoading$: Observable<boolean>
  isAdmin$: Observable<boolean>
  categoriesWithItems$: Observable<CategoriesWithItems[]>
  isCategoryUsed$: Observable<(id: string) => boolean>

  constructor(
    private store: Store<AppState>,
    private enableAdminService: EnableAdminService,
    private dialog: MatDialog
  ) {
    this.isLoading$ = this.store.pipe(select(fromGlobal.isFetching))
    this.isAdmin$ = this.store.pipe(select(fromUser.isAdmin))
    this.categoriesWithItems$ = this.store.pipe(select(fromCategories.categoriesForUI))
    this.isCategoryUsed$ = this.store.pipe(
      select(fromItems.isCategoryUsed),
      map((isUsed) => isUsed.memoized)
    )

    this.store.dispatch(ItemActions.requestAllItems())
    this.store.dispatch(CategoryActions.requestAllCategories())
    this.store.dispatch(ItemActions.requestAllItems())

    this.enableAdminService.obs$.subscribe(() => {
      this.store.dispatch(UserActions.toggle())
    })
  }

  userView(): void {
    this.store.dispatch(UserActions.setNormalUser())
  }

  newCategory(): void {
    this.dialog.open(CategoryDialogComponent, { data: {}, restoreFocus: false })
  }

  newItem(): void {
    this.dialog.open(ItemDialogComponent, { data: {}, restoreFocus: false })
  }

  editCategory(category: Category): void {
    this.dialog.open(CategoryDialogComponent, { data: { category } })
  }

  editItem(item: Item): void {
    this.dialog.open(ItemDialogComponent, { data: { item } })
  }

  deleteItem(id: string): void {
    this.store.dispatch(ItemActions.requestDeleteItem({ id }))
  }

  deleteCategory(id: string): void {
    this.store.dispatch(CategoryActions.requestDeleteCategory({ id }))
  }
}
