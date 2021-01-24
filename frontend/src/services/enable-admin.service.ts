import { Injectable } from '@angular/core'
import { fromEvent, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class EnableAdminService {
  private code = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
  private sequence: string[] = []

  obs$: Observable<void>

  constructor() {
    this.obs$ = fromEvent(window, 'keydown').pipe(
      filter(this.isTheAdminCode),
      map((e) => null)
    )
  }

  isTheAdminCode = (event: KeyboardEvent) => {
    if (event.code) {
      this.sequence.push(event.code)

      if (this.sequence.length > this.code.length) {
        this.sequence.shift()
      }
    }

    return this.code.every((code: string, index: number) => code === this.sequence[index])
  }
}
