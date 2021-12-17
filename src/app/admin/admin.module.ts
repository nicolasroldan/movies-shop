import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';

import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditDeleteMovieComponent } from './components/edit-delete-movie/edit-delete-movie.component';
import { InfoComponent } from './components/info/info.component';


@NgModule({
  declarations: [
    AddMovieComponent,
    EditDeleteMovieComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminModule { }
