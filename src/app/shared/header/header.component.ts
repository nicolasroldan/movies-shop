import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: User;
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private userServie: UserService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.userServie.getUser().subscribe((user: User) => this.user = user)
    );
  }

  public goToCart(): void {
    this.router.navigate(['client/cart']);
  }

  public goToDashboard(): void {
    this.router.navigate(['client/movies-list']);
  }

  public goToAddMovie(): void {
    this.router.navigate(['admin/add-movie']);
  }

  public goToLogin(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
