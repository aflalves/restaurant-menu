import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TokenInterceptor } from 'src/interceptors/token-interceptor'
import { CategoryDialogModule } from 'src/lib/category-dialog/category-dialog.module'
import { ItemDialogModule } from 'src/lib/item-dialog/item-dialog.module'
import { effects, metaReducers, reducers } from 'src/store/app.store'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CategoryDialogModule,
    ItemDialogModule,
    MatDialogModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
