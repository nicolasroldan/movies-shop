import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOVIES } from '../mocks/mock-movies';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor() {}

  getMovies(): Observable<Movie[]> {
    const movies = of(MOVIES);
    return movies;
  }
}
