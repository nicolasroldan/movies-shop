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

  public addMovieToCart(userId: string, movie: Movie):  Observable<Movie> {
    const requestBody: Movie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      genre: movie.genre,
      image: movie.image,
      price: movie.price,
      synopsis: movie.synopsis,
      title: movie.title,
      year: movie.year
    }
    return this.http.post<Movie>(`${apiUrl}/users/${userId}/moviesInCart`, requestBody);
  }

  public deleteMovieFromCart(userId: string, movieId: string): Observable<Movie> {
    return this.http.delete<Movie>(`${apiUrl}/users/${userId}/moviesInCart/${movieId}`);
  }

  public addMovieToRentedList(userId: string, movie: Movie): Observable<Movie> {
    const requestBody: Movie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      genre: movie.genre,
      image: movie.image,
      price: movie.price,
      synopsis: movie.synopsis,
      title: movie.title,
      year: movie.year
    }
    return this.http.post<Movie>(`${apiUrl}/users/${userId}/rentedMovies`, requestBody);
  }
}
