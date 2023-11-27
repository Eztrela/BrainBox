import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './home.component';
import {MemoryboxListingComponent} from "./memorybox-listing/memorybox-listing.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ComponentsModule} from "../components/components.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MemoryboxCardComponent } from './memorybox-listing/memorybox-card/memorybox-card.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { CreateDialogComponent } from './memorybox-listing/create-dialog/create-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import { CalendarComponent } from './calendar/calendar.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    HomeComponent,
    MemoryboxListingComponent,
    MemoryboxCardComponent,
    CreateDialogComponent,
    CalendarComponent
  ],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        RouterLink,
        ComponentsModule,
        FlexLayoutModule,
        MatButtonModule,
        NgOptimizedImage,
        MatIconModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        CalendarModule,
    ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
