import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  @ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;
  public showPassword: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get name(): AbstractControl | null {
    return this.registerForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  public goToLogin(): void {
    this.router.navigate(['auth']);
  }

  public onTogglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordInput.nativeElement.type = this.passwordInput.nativeElement.type === 'password' ? 'text' : 'password';
  }

  public onSubmit(): void {
    if (this.name && this.email && this.password) {
      const user: User = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        isAdmin: false,
        moviesInCart: [],
        rentedMovies: []
      }
      this.subscriptions.add(
        this.userService.createUser(user).subscribe(() => this.router.navigate(['auth']))
      );
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
