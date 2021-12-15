import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../components/cart/cart.component';
import { MovieDetailsComponent } from '../components/movies-grid/movie-details/movie-details.component';
import { MoviesGridComponent } from '../components/movies-grid/movies-grid.component';

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
