import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorInterceptorService} from "./error-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";



@NgModule({
  providers: [
    ErrorInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InterceptorModule { }
