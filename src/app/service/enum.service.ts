import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }

  DAY_TODAY = 'Heute';
  DAY_YESTERDAY = 'Gestern';
  DAY_MONDAY = 'Montag';
  DAY_TUESDAY = 'Dienstag';
  DAY_WEDNESDAY = 'Mittwoch';
  DAY_THURSDAY = 'Donnerstag';
  DAY_FRIDAY = 'Freitag';
  DAY_SATURDAY = 'Samstag';
  DAY_SUNDAY = 'Sonntag';

  MONTH_JANUARY = 'Januar';
  MONTH_FEBRUARY = 'Februar';
  MONTH_MARCH = 'März';
  MONTH_APRIL = 'April';
  MONTH_MAY = 'Mai';
  MONTH_JUNE = 'Juni';
  MONTH_JULY = 'Juli';
  MONTH_AUGUST = 'August';
  MONTH_SEPTEMBER = 'September';
  MONTH_OCTOBER = 'Oktober';
  MONTH_NOVEMBER = 'November';
  MONTH_DECEMBER = 'Dezember';
}
