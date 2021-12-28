import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/shared/services/user.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  public loading: boolean;
  private subscriptions: Subscription = new Subscription();
  public users: User[] = [];
  public totalPriceRentedMovies: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.add(
      this.userService.getUsers().subscribe((users: User[]) => {
        const clients = users.filter(user => !user.isAdmin);
        this.users = clients;
        this.loading = false;
        this.totalPriceRentedMovies = this.calculateTotalUsersRentedMoviesPrice(this.users);
      })
    );
  }

  public calculateUserRentedMoviesPrice(user: User): number {
    return user.rentedMovies.map(movie => movie.price).reduce((a, b) => a + b, 0);
  }

  public calculateTotalUsersRentedMoviesPrice(users: User[]): number {
    let allUsersTotal: number = 0;
    users.forEach((user: User) => {
      const eachUserTotal = user.rentedMovies.map(movie => movie.price).reduce((a, b) => a + b, 0);
      allUsersTotal += eachUserTotal;
    });
    return allUsersTotal;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
