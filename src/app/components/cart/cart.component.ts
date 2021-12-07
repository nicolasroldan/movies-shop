import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  calculateTotalPrice(): number {
    return this.user.moviesInCart.map(movie => movie.price).reduce((a, b) => { return a + b }, 0);
  }
}
