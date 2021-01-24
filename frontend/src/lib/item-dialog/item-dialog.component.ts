import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Category } from 'src/models/category'
import { Item } from 'src/models/item'
import { AppState } from 'src/store/app.store'
import { fromCategories } from 'src/store/categories/categories.selectors'
import { ItemActions } from 'src/store/items/items.actions'

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent {
  form: FormGroup
  existingItem: Item
  categories$: Observable<Category[]>

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }
  ) {
    this.existingItem = data.item
    this.form = new FormGroup({
      name: new FormControl(this.existingItem?.name || '', Validators.required),
      price: new FormControl(this.existingItem?.price || '', Validators.required),
      categoryId: new FormControl(this.existingItem?.categoryId || '', Validators.required),
      description: new FormControl(this.existingItem?.description || ''),
    })

    this.categories$ = this.store.pipe(select(fromCategories.selectAll))
  }

  addOrUpdate(): void {
    if (!!this.existingItem) {
      this.store.dispatch(
        ItemActions.requestUpdateItem({
          item: {
            _id: this.existingItem._id,
            ...this.form.value,
          },
        })
      )
    } else {
      this.store.dispatch(
        ItemActions.requestAddItem({
          item: this.form.value,
        })
      )
    }

    this.dialogRef.close()
  }
}
