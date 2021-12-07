import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})
export class MoviesGridComponent implements OnInit {
  public movies: Movie[] = [];
  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
    })

  }

  goToMovieDetails(movie: Movie): void {
    this.router.navigate([`/movies/details/${movie.id}`]);
  }

  goToMoviesList(): void {
    document.getElementById('movies')?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
      });
  }
}
