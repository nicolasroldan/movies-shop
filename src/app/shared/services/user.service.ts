import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

const apiUrl = 'https://61b383acaf5ff70017ca1fbb.mockapi.io/tumuvi/api/v1';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;

  constructor(private http: HttpClient) { }

  public setUser(user: User): void {
    this.user = user;
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${apiUrl}/users`);
  }

  public getUser(): Observable<User> {
    const userId = localStorage.getItem('userId');
    return this.http.get<User>(`${apiUrl}/users/${userId}`);
  }

  public createUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${apiUrl}/users`, user);
  }
}
