import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  @ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;
  public showPassword: boolean = false;
  private usersList: User[] = [];
  public incorrectPassword: boolean;
  public nonExistingUser: boolean;
  public errorMessageString: string;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.getUsers().subscribe((users: User[]) => {
        this.usersList = users;
      })
    );
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  public goToRegister(): void {
    this.router.navigate(['register']);
  }

  public onTogglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordInput.nativeElement.type = this.passwordInput.nativeElement.type === 'password' ? 'text' : 'password';
  }

  public onSubmit(): void {
    const existingUser: User | undefined = this.usersList.find((user: User) => user.email === this.email?.value);
    this.nonExistingUser = !existingUser ? true : false;
    this.incorrectPassword = this.password?.value !== existingUser?.password ? true : false;
    this.errorMessageString = this.nonExistingUser ? 'Non Existing User' : this.incorrectPassword ? 'Incorrect Password' : '';

    if (!this.nonExistingUser && !this.incorrectPassword && existingUser) {
      const user: User = {
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        isAdmin: existingUser.isAdmin,
        id: existingUser.id,
        moviesInCart: existingUser.moviesInCart,
        rentedMovies: existingUser.rentedMovies
      }
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userId', user.id ?? '');
      this.userService.setUser(user);
      this.router.navigate(['movies-list']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
