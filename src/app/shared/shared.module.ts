import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SpinnerComponent } from './spinner/spinner.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    SpinnerComponent,
    ConfirmationModalComponent
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
    SpinnerComponent
  ]
})
export class SharedModule { }
