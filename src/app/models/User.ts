import { Movie } from "./Movie";

export interface User {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    id?: string;
    moviesInCart: Movie[];
    rentedMovies: Movie[]; 
}