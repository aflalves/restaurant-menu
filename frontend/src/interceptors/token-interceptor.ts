import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // normal users can only perform GET requests
    // for the other requests, lets add the expected hardcoded admin token
    if (request.method !== 'GET') {
      request = request.clone({
        setHeaders: {
          customAuth: 'mocked-auth-token',
        },
      })
    }

    return next.handle(request)
  }
}
