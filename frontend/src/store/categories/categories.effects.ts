import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { CategoryApiService } from 'src/services/category-api.service'
import { CategoryActions } from './categories.actions'

@Injectable()
export class CategoriesEffects {
  getAllCategorys$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.requestAllCategories),
      switchMap(() =>
        this.categoryApi.get().pipe(
          map((categories) => CategoryActions.receiveAllCategories({ categories })),
          catchError((error) => of(CategoryActions.categoryRequestError({ error })))
        )
      )
    )
  )

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.requestAddCategory),
      switchMap((action) =>
        this.categoryApi.add(action.category).pipe(
          map((category) => CategoryActions.addCategorySuccess({ category })),
          catchError((error) => of(CategoryActions.categoryRequestError({ error })))
        )
      )
    )
  )

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.requestDeleteCategory),
      switchMap((action) =>
        this.categoryApi.delete(action.id).pipe(
          map((res) => CategoryActions.deleteCategorySuccess({ id: action.id })),
          catchError((error) => of(CategoryActions.categoryRequestError({ error })))
        )
      )
    )
  )

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.requestUpdateCategory),
      switchMap((action) =>
        this.categoryApi.update(action.category).pipe(
          map((category) => CategoryActions.updateCategorySuccess({ category })),
          catchError((error) => of(CategoryActions.categoryRequestError({ error })))
        )
      )
    )
  )

  constructor(private actions$: Actions, private categoryApi: CategoryApiService) {}
}
