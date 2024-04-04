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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent implements OnInit {
  searchTitle: string = '';
  asesorFiltro: string = '';
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
    slotMinTime: '08:00:00Z',
    slotMaxTime: '17:30:00Z',
    initialEvents: this.eventos ,
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventSources: [
      {
        url: 'http://localhost:8080/eventos',
        extraParams: { asesor: this.searchTitle } // URL del endpoint en el Back
        
      }
    ],
  });
  
  currentEvents = signal<EventApi[]>([]);
  
  constructor(private changeDetector: ChangeDetectorRef, private eventoService: EventoService, private http: HttpClient) {
  }

  
  ngOnInit() {
   // this.obtenerEventos();
    
  }


  buscar() {
    console.log('searchTitle:', this.searchTitle);
    this.eventoService.obtenerEventoPorUDE(this.searchTitle).subscribe(
      (data) => {
        this.eventos = data;
        console.log('Eventos traidos con el filtro: ', this.eventos);
        this.actualizarEventosEnCalendario();
       
      },
      (error) => {
        console.error('Error al buscar en la base de datos:', error);
      }
    );
  }


  
  logTitle(title: string) {
    console.log(title);
  }


  
  obtenerEventos() {
    this.eventoService.obtenerEventoServices().subscribe(
      (data) => {
        this.eventos = data;
        console.log('Eventos traidos desde el Back: ', this.eventos);
        this.actualizarEventosEnCalendario();
      },
      (error) => {
        console.error('Error al obtener eventos: ', error);
      }
    );
  }
  
  actualizarEventosEnCalendario() {
    this.calendarOptions.update(options => ({
      ...options,
      initialEvents: this.eventos.map(evento => {
        if (evento.startDay && evento.endDay) {
          const formattedStart = this.formatToISOWithOffset(evento.startStr);
          const formattedEnd = this.formatToISOWithOffset(evento.endDay);
          return {
            ...evento,
            startStr: formattedStart,
            end: formattedEnd,
            display: 'auto' 
          };
        } else {
          return null; 
        }
      }).filter(evento => evento !== null) 
    }));
  }
  

  formatToISOWithOffset(date: Date | string): string {
    // Verificar si date es una cadena y convertirla a Date si es necesario
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    
    // Verificar si dateObject es un objeto Date válido
    if (dateObject instanceof Date && !isNaN(dateObject.getTime())) {
      // Obtener los componentes de la fecha
      const year = dateObject.getFullYear();
      const month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Sumar 1 al mes y agregar cero al principio si es necesario
      const day = ('0' + dateObject.getDate()).slice(-2); // Agregar cero al principio si es necesario
      const hours = ('0' + dateObject.getHours()).slice(-2); // Obtener las horas y agregar cero al principio si es necesario
      const minutes = ('0' + dateObject.getMinutes()).slice(-2); // Obtener los minutos y agregar cero al principio si es necesario
      const seconds = ('0' + dateObject.getSeconds()).slice(-2); // Obtener los segundos y agregar cero al principio si es necesario
      const offset = '-01:00'; // Offset de tiempo deseado
  
      // Construir la cadena de fecha en el formato deseado
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
    } else {
      console.error('date no es un objeto Date válido:', date);
      return ''; // Manejar el caso en el que date no es un objeto Date válido
    }
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
    if (confirm(`Estas seguro que deseas eliminar el evento '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
  
}
