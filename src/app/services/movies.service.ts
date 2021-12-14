import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'https://61b383acaf5ff70017ca1fbb.mockapi.io/tumuvi/api/v1';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) { }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${apiUrl}/movies`);
  }

  public getMovie(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${apiUrl}/movies/${movieId}`);
  }

  public addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${apiUrl}/movies`, movie);
  }
  
  public deleteMovie(movieId: string): Observable<Movie> {
    return this.http.delete<Movie>(`${apiUrl}/movies/${movieId}`);
  }

  public editMovie(movieId: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${apiUrl}/movies/${movieId}`, movie);
  }

  public addMovieToCart(userId: string, movie: Movie): Observable<Movie> {
    const requestBody: Movie = movie;
    return this.http.post<Movie>(`${apiUrl}/users/${userId}/moviesInCart`, requestBody);
  }

  public deleteMovieFromCart(userId: string, movieId: string): Observable<Movie> {
    return this.http.delete<Movie>(`${apiUrl}/users/${userId}/moviesInCart/${movieId}`);
  }

  public addMovieToRentedList(userId: string, movie: Movie): Observable<Movie> {
    const requestBody: Movie = movie;  
    return this.http.post<Movie>(`${apiUrl}/users/${userId}/rentedMovies`, requestBody);
  }
}
