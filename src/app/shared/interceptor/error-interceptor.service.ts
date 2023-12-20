import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {SnackbarService} from "../services/snackbar.service";

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((erro: HttpErrorResponse) => this.processarErroResposta(erro)));
  }

  processarErroResposta(erro: HttpErrorResponse): Observable<HttpEvent<any>> {
    this.snackbarService.erro(erro.message);
    return throwError(() => erro);
  }

}
