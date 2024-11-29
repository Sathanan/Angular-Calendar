import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importiere FormsModule für ngModel

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule], // Füge FormsModule hier hinzu
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  currentDate: Date = new Date();
  currentMonth!: number;
  currentYear!: number;
  daysInMonth: number[] = [];
  emptyDays: number[] = [];
  weekdays: string[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  monthNames: string[] = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
  ];

  // Array für Notizen pro Tag
  notes: { [key: number]: string[] } = {}; // Notizen sind jetzt Arrays, um mehrere Notizen pro Tag zu ermöglichen

  noteInput: { [key: number]: string } = {};

  ngOnInit(): void {
    this.updateCalendar();
  }

  updateCalendar(): void {
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const startDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const adjustedStartDay = (startDay === 0 ? 7 : startDay) - 1;
    this.emptyDays = Array.from({ length: adjustedStartDay });
  }

  prevMonth(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth - 1);
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth + 1);
    this.updateCalendar();
  }

  isWeekend(day: number): boolean {
    const date = new Date(this.currentYear, this.currentMonth, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 6 || dayOfWeek === 0; // 6 soll sa darstellen und 0 so |englische kalender
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentMonth === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

  // Methode, um eine Notiz hinzuzufügen
  addNote(day: number, note: string): void {
    if (note.trim()) {
      if (!this.notes[day]) {
        this.notes[day] = [];
      }
      this.notes[day].push(note); // Füge die Notiz dem Array des Tages hinzu
    }
    this.noteInput[day] = ''; // Leert das Eingabefeld nach dem Speichern
  }

  // Methode, um eine Notiz zu löschen
  deleteNote(day: number, index: number): void {
    if (this.notes[day]) {
      this.notes[day].splice(index, 1); // Löscht die Notiz aus dem Array für den angegebenen Tag
    }
  }

  // Zeigt das Eingabefeld für Notizen an
  showNoteInput(day: number): void {
    this.noteInput[day] = ''; // Leert das Eingabefeld, falls es vorher noch Daten hatte
  }

  // Überprüft, ob das Notiz-Eingabefeld angezeigt werden soll
  isNoteInputVisible(day: number): boolean {
    return this.noteInput.hasOwnProperty(day) && this.noteInput[day] !== undefined;
  }
}
