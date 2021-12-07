import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/Movie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('../../assets/mocks/movies-list-mock.json');
  }

  getMovie(movieId: string): Observable<Movie[]> {
    return this.http.get<Movie[]>('../../assets/mocks/movies-list-mock.json')
      .pipe(
        map(response => response.filter((data) => data.id === parseInt(movieId)))
      )
  }
}
