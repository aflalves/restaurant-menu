import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { ItemApiService } from 'src/services/item-api.service'
import { ItemActions } from './items.actions'

@Injectable()
export class ItemsEffects {
  getAllItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.requestAllItems),
      switchMap(() =>
        this.itemApi.get().pipe(
          map((items) => ItemActions.receiveAllItems({ items })),
          catchError((error) => of(ItemActions.itemRequestError({ error })))
        )
      )
    )
  )

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.requestAddItem),
      switchMap((action) =>
        this.itemApi.add(action.item).pipe(
          map((item) => ItemActions.addItemSuccess({ item })),
          catchError((error) => of(ItemActions.itemRequestError({ error })))
        )
      )
    )
  )

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.requestDeleteItem),
      switchMap((action) =>
        this.itemApi.delete(action.id).pipe(
          map((res) => ItemActions.deleteItemSuccess({ id: action.id })),
          catchError((error) => of(ItemActions.itemRequestError({ error })))
        )
      )
    )
  )

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.requestUpdateItem),
      switchMap((action) =>
        this.itemApi.update(action.item).pipe(
          map((item) => ItemActions.updateItemSuccess({ item })),
          catchError((error) => of(ItemActions.itemRequestError({ error })))
        )
      )
    )
  )

  constructor(private actions$: Actions, private itemApi: ItemApiService) {}
}
