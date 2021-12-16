import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditDeleteMovieComponent } from './components/edit-delete-movie/edit-delete-movie.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'add-movie', component: AddMovieComponent, canActivate: [AdminGuard] },
  { path: 'edit-movie/:id', component: EditDeleteMovieComponent, canActivate: [AdminGuard] },
  { path: 'info', component: InfoComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
