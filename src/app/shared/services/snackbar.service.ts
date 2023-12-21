import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {AMensagem} from "../interfaces/imensagem";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService extends AMensagem {

  constructor(private snackBar: MatSnackBar) {
    super();
  }

  sucesso(mensagem: string): void {
    this.abrirSnackBar(mensagem, ['success']);
  }

  erro(mensagem: string): void {
    this.abrirSnackBar(mensagem, ['error']);
  }

  info(mensagem: string): void {
    this.abrirSnackBar(mensagem, ['info']);
  }

  alerta(mensagem: string): void {
    this.abrirSnackBar(mensagem, ['warning']);
  }

  private abrirSnackBar(mensagem: string, extraClasses: string[]): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    config.panelClass = extraClasses;
    this.snackBar.open(mensagem, '✕', config);
  }
}
