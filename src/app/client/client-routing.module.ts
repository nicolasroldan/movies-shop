import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { MovieDetailsComponent } from './movies-grid/movie-details/movie-details.component';
import { MoviesGridComponent } from './movies-grid/movies-grid.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies-list', pathMatch: 'full' },
  { path: 'movies-list', component: MoviesGridComponent },
  { path: 'movies/details/:id', component: MovieDetailsComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
