import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable } from 'rxjs';
import {MemoryboxService} from "../../../shared/services/memorybox.service";
import {ITask} from "../../../shared/interfaces/itask";
import {TaskEvent} from "../../../shared/interfaces/task-event";
import {Router} from "@angular/router";
import { MemoryboxFirestoreService } from 'src/app/shared/services/memorybox-firestore.service';



function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events$!: Observable<CalendarEvent<{ taskEvent: TaskEvent }>[]>;

  activeDayIsOpen: boolean = false;

  constructor(private memoryboxService: MemoryboxFirestoreService, private router:Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {

    // this.events$ = this.memoryboxService.getAllTasksWithColor().pipe(
    //   map((taskEvents: TaskEvent[]) =>
    //     taskEvents.map((event: TaskEvent) => ({
    //       title: event.task.title,
    //       start: new Date(event.task.datetimeDue),
    //       color: {
    //         primary: event.color,
    //         secondary: 'rgba(124, 124, 149, 0.22)'
    //       },
    //       allDay: true,
    //       meta: {
    //         taskEvent: { task: event.task, idBox: event.idBox, color: event.color },
    //       },
    //     }))
    //   )
    // );
  }

  dayClicked({
               date,
               events,
             }: {
    date: Date;
    events: CalendarEvent<{ task: ITask }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ taskEvent: TaskEvent }>): void {
    this.router.navigateByUrl(`memorybox/${event.meta?.taskEvent.idBox}`)
  }
}
