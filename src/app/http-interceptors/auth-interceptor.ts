import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dialogRef: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const authReq = req.clone({ headers });
    return next.handle(authReq).pipe(catchError(error => this.handleError(error)));
  }
  private handleError(error: HttpErrorResponse) {
    this.dialogRef.open(ConfirmationModalComponent, {
      width: '250px',
      data: { message: "Server Error: Something didn't work on our end" }
    });
    return throwError(error);
  }
}
