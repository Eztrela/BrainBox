import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";

import {NavigationComponent} from "./navigation/navigation.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import { MemoryboxListingComponent } from './memorybox-listing/memorybox-listing.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    NavigationComponent,
    ToolbarComponent,
    MemoryboxListingComponent
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
    MatCardModule
  ],
  exports: [
    NavigationComponent,
    ToolbarComponent
  ]
})
export class LayoutsModule { }
