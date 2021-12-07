import { Movie } from "./Movie";

export interface User {
    email: string;
    moviesInCart: Movie[];
    rentedMovies?: Movie[]; 
}