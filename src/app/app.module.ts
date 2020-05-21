import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbActionsModule, NbSidebarService, NbIconModule, NbToastrModule, NbAlertModule, NbMenuModule, NbDialogModule, NbCardModule, NbInputModule, NbButtonModule, NbSpinnerModule, NbBadgeModule, NbTooltipModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './modules/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { MoviesListComponent } from './modules/movies-list/movies-list.component';
import { AddMovieComponent } from './modules/add-movie/add-movie.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MovieCardComponent } from './modules/movie-card/movie-card.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FlexLayoutModule } from '@angular/flex-layout';
import { PosterComponent } from './modules/poster/poster.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesListComponent,
    AddMovieComponent,
    MovieCardComponent,
    PosterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    NbToastrModule.forRoot(),
    NbAlertModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NgMultiSelectDropDownModule.forRoot(),
    NbSpinnerModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    NbTooltipModule,
    HttpClientModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'default' }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
