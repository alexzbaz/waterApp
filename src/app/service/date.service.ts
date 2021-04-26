import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {EnumService} from './enum.service'; /*
import {TranslateService} from '@ngx-translate/core';*/

@Injectable({
    providedIn: 'root'
})
export class DateService {
    weekdays = [
        this.ENUM.DAY_MONDAY,
        this.ENUM.DAY_TUESDAY,
        this.ENUM.DAY_WEDNESDAY,
        this.ENUM.DAY_THURSDAY,
        this.ENUM.DAY_FRIDAY,
        this.ENUM.DAY_SATURDAY,
        this.ENUM.DAY_SUNDAY
    ];
    months = [
        this.ENUM.MONTH_JANUARY,
        this.ENUM.MONTH_FEBRUARY,
        this.ENUM.MONTH_MARCH,
        this.ENUM.MONTH_APRIL,
        this.ENUM.MONTH_MAY,
        this.ENUM.MONTH_JUNE,
        this.ENUM.MONTH_JULY,
        this.ENUM.MONTH_AUGUST,
        this.ENUM.MONTH_SEPTEMBER,
        this.ENUM.MONTH_OCTOBER,
        this.ENUM.MONTH_NOVEMBER,
        this.ENUM.MONTH_DECEMBER,
    ];

    constructor(private datePipe: DatePipe,
                private ENUM: EnumService, /*
              private translate: TranslateService*/) {
    }

    getTimeOfMessage(): string {
        let date = new Date(new Date().getTime());
        let hours = this.getHours(date.getHours());
        let minutes = this.getMinutes(date.getMinutes());
        return hours + ':' + minutes;
    }

    getHours(hours) {
        if (hours < 10) {
            hours = '0' + String(hours);
        } else if (hours < 1) {
            hours = '00';
        } else {
            hours = String(hours);
        }
        return hours;
    }

    getMinutes(minutes) {
        if (minutes < 10) {
            minutes = '0' + String(minutes);
        } else if (minutes < 1) {
            minutes = '00';
        } else {
            minutes = String(minutes);
        }
        return minutes;
    }

    getDate(_date: number, _days: number) {
        let date: Date;
        if (!_date) {
            date = new Date();
            date.setHours(0, 0, 0, 0);
        } else {
            date = new Date(_date);
            date.setHours(0, 0, 0, 0);
        }
        if (_days) {
            date = (new Date(date.setDate(date.getDate() - _days)));
            date.setHours(0, 0, 0, 0);
        }
        return {date: date, msDate: date.getTime()};
    }

    getTimestamp(receipt): string {
        let todaysDateInMs = this.getDate(null, null).msDate;
        let dateOfMessage = this.getDate(receipt, null).date;
        let dateOfMessageInMs = this.getDate(receipt, null).msDate;

        if (dateOfMessageInMs === todaysDateInMs) {
            return this.ENUM.DAY_TODAY;

        } else if (dateOfMessageInMs < todaysDateInMs) {
            let yesterdayInMs = this.getDate(null, 1).msDate;
            if (dateOfMessageInMs === yesterdayInMs) {
                return this.ENUM.DAY_YESTERDAY;

            } else if (dateOfMessageInMs < yesterdayInMs) {
                let twoDaysAgoInMs = this.getDate(null, 2).msDate;
                let sevenDaysAgoInMs = this.getDate(null, 7).msDate;

                if (dateOfMessageInMs <= twoDaysAgoInMs && dateOfMessageInMs > sevenDaysAgoInMs) {
                    return this.getWeekday(dateOfMessage);

                } else if (dateOfMessageInMs <= sevenDaysAgoInMs) {
                    let date = dateOfMessage.getDate();
                    let month = this.months[dateOfMessage.getMonth()];

                    let yearOfMessage = dateOfMessage.getFullYear();
                    let currentYear = this.getCurrentYear();

                    if (yearOfMessage < currentYear) {
                        return date + '. ' + month + ' ' + yearOfMessage;
                    }

                    return date + '. ' + month;
                }
            }
        }
    }

    getWeekday(date: Date): string {
        let weekday: number = date.getDay() - 1;
        return this.weekdays[weekday];
    }

    getCurrentYear(): number {
        let date: Date = new Date();
        return date.getFullYear();
    }

}
