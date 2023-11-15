import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink} from "@angular/router";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SnackbarComponent } from './snackbar/snackbar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    NgOptimizedImage,
    RouterLink,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent
  ]
})
export class ComponentsModule { }
