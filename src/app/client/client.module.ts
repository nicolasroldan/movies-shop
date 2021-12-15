import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';

import { MoviesGridComponent } from './movies-grid/movies-grid.component';
import { CartComponent } from './cart/cart.component';
import { MovieDetailsComponent } from './movies-grid/movie-details/movie-details.component';


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
