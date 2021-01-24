import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { ItemApiService } from 'src/services/item-api'
import { map, switchMap } from 'rxjs/operators'
import { ItemActions } from './items.actions'

@Injectable()
export class ItemsEffects {
  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.requestAddItem),
      switchMap((action) => this.itemApi.add(action.item)),
      map((item) => ItemActions.addItemSuccess({ item }))
    )
  )

  getAllItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.requestAllItems),
      switchMap(() => this.itemApi.get()),
      map((items) => ItemActions.receiveAllItems({ items }))
    )
  )

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.requestDeleteItem),
      switchMap((action) => this.itemApi.delete(action.id).pipe(map((res) => action.id))),
      map((id) => ItemActions.deleteItemSuccess({ id }))
    )
  )

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.requestUpdateItem),
      switchMap((action) => this.itemApi.update(action.item)),
      map((item) => ItemActions.updateItemSuccess({ item }))
    )
  )

  constructor(private actions$: Actions, private itemApi: ItemApiService) {}
}
