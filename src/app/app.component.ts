import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component'; // Kalender importieren

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent], // Kalender in imports hinzufügen
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calender-app';
}
