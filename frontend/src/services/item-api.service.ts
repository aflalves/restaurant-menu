import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Item } from 'src/models/item'

@Injectable({
  providedIn: 'root',
})

export class ItemApiService {
  apiUrl = `${environment.API_URL}items`

  constructor(private http: HttpClient) {}

  get(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl)
  }

  add(item: Partial<Item>): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item)
  }

  update(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${item._id}`, item)
  }

  delete(id: string): Observable<Item> {
    return this.http.delete<Item>(`${this.apiUrl}/${id}`)
  }
}
