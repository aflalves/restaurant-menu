import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import { CategoryActions } from './categories.actions'
import { CategoryApiService } from 'src/services/category-api'

@Injectable()
export class CategoriesEffects {
  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.requestAddCategory),
      switchMap((action) => this.categoryApi.add(action.category)),
      map((category) => CategoryActions.addCategorySuccess({ category }))
    )
  )

  getAllCategorys$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.requestAllCategories),
      switchMap(() => this.categoryApi.get()),
      map((categories) => CategoryActions.receiveAllCategories({ categories }))
    )
  )

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.requestDeleteCategory),
      switchMap((action) => this.categoryApi.delete(action.id).pipe(map((res) => action.id))),
      map((id) => CategoryActions.deleteCategorySuccess({ id }))
    )
  )

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.requestUpdateCategory),
      switchMap((action) => this.categoryApi.update(action.category)),
      map((category) => CategoryActions.updateCategorySuccess({ category }))
    )
  )

  constructor(private actions$: Actions, private categoryApi: CategoryApiService) {}
}
