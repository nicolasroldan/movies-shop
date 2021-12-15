import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditDeleteMovieComponent } from './edit-delete-movie/edit-delete-movie.component';


@NgModule({
  declarations: [
    AddMovieComponent,
    EditDeleteMovieComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
