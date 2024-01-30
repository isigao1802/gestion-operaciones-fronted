import { Component , signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { EventoService } from '../evento.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent{
  eventos: any[] = [];
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      multiMonthPlugin,
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'listWeek,timeGridDay,timeGridWeek,timeGridDays,dayGridMonth,multiMonthYear'
    },
    views: {
      timeGridDays: {
        type: 'timeGrid',
        duration: { days: 15 },
        buttonText: '15 días',
        firstDay: 1
      }
    },
    initialView: 'listWeek',
    slotMinTime: '08:00:00',
    slotMaxTime: '17:30:00',
    initialEvents: this.eventos , // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventSources: [
      {
        url: 'http://localhost:8080/eventos', // URL de tu endpoint en Spring Boot
        // Puedes usar GET u otro método según tu configuración en Spring Boot
        // Otras opciones para esta fuente, si es necesario
      }
    ],
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
   
  });
  
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, private eventoService: EventoService) {
  }

  
  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.eventoService.obtenerEventos().subscribe(
      (data) => {
        this.eventos = data;

        // Actualizar los eventos en las opciones del calendario después de obtenerlos
        this.actualizarEventosEnCalendario();
      },
      (error) => {
        console.error('Error al obtener eventos: ', error);
      }
    );
  }

  actualizarEventosEnCalendario() {
    this.calendarOptions.update((options) => ({
      ...options,
      initialEvents: this.eventos,
    }));
  }


  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      initialEvents: this.eventos,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Por favor ingrese un nuevo título para el evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}