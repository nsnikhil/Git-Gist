import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';

import {AppComponent} from './app.component';
import {FilterDialogComponent, GridListComponentComponent} from './grid-list-component/grid-list-component.component';
import {GridListItemComponentComponent} from './grid-list-component/grid-list-item-component/grid-list-item-component.component';
import {GithubAuthInterceptor} from './grid-list-component/githubauth.interceptor';
import {CommonModule} from '@angular/common';
import {NetworkApiService} from './network/network-api.service';

@NgModule({
  declarations: [
    AppComponent,
    GridListComponentComponent,
    GridListItemComponentComponent,
    FilterDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatRippleModule,
    MatTabsModule
  ],
  providers: [
    NetworkApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GithubAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FilterDialogComponent]
})
export class AppModule {
}
