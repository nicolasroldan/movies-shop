import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { CartComponent } from './components/cart/cart.component';
import { EditDeleteMovieComponent } from './components/edit-delete-movie/edit-delete-movie.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movies-grid/movie-details/movie-details.component';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'movies-list', component: MoviesGridComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'movies/details/:id', component: MovieDetailsComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'edit-movie/:id', component: EditDeleteMovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
