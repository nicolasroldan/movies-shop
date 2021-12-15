import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';

import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { CartComponent } from './components/cart/cart.component';
import { MovieDetailsComponent } from './components/movies-grid/movie-details/movie-details.component';


@NgModule({
  declarations: [
    MoviesGridComponent,
    CartComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
