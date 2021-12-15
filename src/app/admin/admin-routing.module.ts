import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditDeleteMovieComponent } from './components/edit-delete-movie/edit-delete-movie.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-movie', pathMatch: 'full' },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'edit-movie/:id', component: EditDeleteMovieComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
