import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {HomeModule} from "./home/home.module";
import { MemoryboxPageModule } from './memorybox-page/memorybox-page.module';
import { MatSelectModule } from '@angular/material/select';
import { LoginModule } from "./login/login.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    RouterLink,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    HomeModule,
    MemoryboxPageModule,
    LoginModule
  ]
})
export class LayoutsModule { }
