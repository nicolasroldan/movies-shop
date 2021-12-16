import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { MovieDetailsComponent } from './components/movies-grid/movie-details/movie-details.component';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies-list', pathMatch: 'full' },
  { path: 'movies-list', component: MoviesGridComponent, canActivate: [AuthGuard] },
  { path: 'movies/details/:id', component: MovieDetailsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
