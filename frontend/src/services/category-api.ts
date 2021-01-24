import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Category } from 'src/models/category'

@Injectable({
  providedIn: 'root',
})

export class CategoryApiService {
  apiUrl = `${environment.API_URL}item`

  constructor(private http: HttpClient) {}

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    })
  }

  add(item: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, item)
  }

  update(item: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${item._id}`, item)
  }

  delete(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/${id}`)
  }
}
