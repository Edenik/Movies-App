import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './modules/movies-list/movies-list.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './modules/login/login.component';

import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
firebase.initializeApp(environment.firebaseConfig);

const routes: Routes = [
  {path:'' , component: MoviesListComponent , canActivate :[AuthGuard]},
  {path:'index' , component: MoviesListComponent , canActivate :[AuthGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
