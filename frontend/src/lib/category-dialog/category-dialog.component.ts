import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Category } from 'src/models/category'
import { AppState } from 'src/store/app.store'
import { CategoryActions } from 'src/store/categories/categories.actions'

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent {
  form: FormGroup
  existingCategory: Category

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category }
  ) {
    this.existingCategory = data.category
    this.form = new FormGroup({
      name: new FormControl(this.existingCategory?.name || '', Validators.required),
    })
  }

  addOrUpdate(): void {
    if (!!this.existingCategory) {
      this.store.dispatch(
        CategoryActions.requestUpdateCategory({
          category: {
            _id: this.existingCategory._id,
            ...this.form.value,
          },
        })
      )
    } else {
      this.store.dispatch(
        CategoryActions.requestAddCategory({
          category: this.form.value,
        })
      )
    }

    this.dialogRef.close()
  }
}
