import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userId: string = localStorage.getItem('userId') ?? '';
    return this.userIsAdmin(userId);
  }
  private userIsAdmin(userId: string): Observable<boolean> {
    return this.userService.getUser(userId).pipe(
      map((user: User) => {
        if (user.isAdmin) {
          return true;
        }
        else {
          this.router.navigate(['auth']);
          return false;
        }
      })
    )
  }
}
