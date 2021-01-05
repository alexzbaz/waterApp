import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private datePipe: DatePipe) { }

  getYear() {
    return Number(this.datePipe.transform(new Date(), 'yyyy'));
  }

  getMonth() {
    return Number(this.datePipe.transform(new Date(), 'MM'));
  }

  getDay() {
    return Number(this.datePipe.transform(new Date(), 'dd'));
  }

  getHour() {
    return Number(this.datePipe.transform(new Date(), 'HH'));
  }

  getMinute() {
    return Number(this.datePipe.transform(new Date(), 'mm'));
  }

  getDate() {
    return this.datePipe.transform(new Date(), 'yyyy.MM.dd');
  }

  loadAmountWeekly() {

  }

  loadAmountMonthly() {

  }
}
