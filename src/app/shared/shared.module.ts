import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { UserService } from './services/user.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    ConfirmationModalComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    UserService
  ],
  exports: [
    SpinnerComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
