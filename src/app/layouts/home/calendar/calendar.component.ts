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

  constructor(private memoryboxService: MemoryboxService, private router:Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    const params = new HttpParams()
      .set(
        'primary_release_date.gte',
        format(getStart(this.viewDate), 'yyyy-MM-dd')
      )
      .set(
        'primary_release_date.lte',
        format(getEnd(this.viewDate), 'yyyy-MM-dd')
      )
      .set('api_key', '0ec33936a68018857d727958dca1424f');

    const color = {
      primary: '#9593D9',
      secondary: 'rgba(124, 124, 149, 0.22)',
    };

    this.events$ = this.memoryboxService.getAllTasksWithId().pipe(
      map((taskEvents: TaskEvent[]) =>
        taskEvents.map((event: TaskEvent) => ({
          title: event.task.title,
          start: new Date(event.task.datetimeDue),
          color: color,
          allDay: true,
          meta: {
            taskEvent: { task: event.task, idBox: event.idBox },
          },
        }))
      )
    );
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
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
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
