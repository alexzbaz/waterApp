import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {DatePipe} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storage;

    constructor(private sqlite: SQLite,
                private datePipe: DatePipe) {
    }

    createDB() {
        this.sqlite.create({
            name: 'water',
            location: 'default'
        }).then((db: SQLiteObject) => {
            this.storage = db;
            this.createDbFormat();
        });
    }

    createDbFormat() {
        this.storage.executeSql('CREATE TABLE IF NOT EXISTS water_drank (id INTEGER PRIMARY KEY AUTOINCREMENT, amount, year, month, day, hour, minute)')
            .then(res => console.log('Database \'Water Drank\' created'));
        this.storage.executeSql('CREATE TABLE goal (amount, goal_set)')
            .then(res => console.log('Database \'Goal\' created'));
    }

    // Amount comes in ml
    storeAmount(amount) {
        let store = [amount, this.getYear(), this.getMonth(), this.getDay(), this.getHour(), this.getMinute()];
        return this.storage.executeSql('INSERT INTO water_drank (amount, year, month, day, hour, minute) VALUES (?, ?, ?, ?, ?, ?)', store)
            .then(res => {
                console.log('Amount stored', res);
            });
    }

    loadAmountOfDay() {
        console.log('loadAmountOfDay()');
        let date = [this.getYear(), this.getMonth(), this.getDay()];
        return this.storage.executeSql('SELECT amount FROM water_drank WHERE year = ? AND month = ? AND day = ?', date)
            .then(res => {
                    console.log('Amount loaded', res);
                    return res;
                }
            );
    }

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

    // Vorschritte: In einer Übersicht werden die letzten Einträge geladen. Dort wird ein Eintrag ausgewählt. Der ausgewählte Eintrag wird
    // an diese Funktion übergeben
    async deleteEntry(id) {
        await this.storage.executeSql('DELETE FROM water_drank WHERE id = ?', [id])
            .then(res => {
                console.log('Delete Successful');
            })
            .catch(res => {
                console.log('Delete Unsuccessful', res);
            });
    }

    async getDailyGoal() {
        return this.storage.executeSql('SELECT amount FROM goal WHERE goal_set = ?', [this.getDate()])
            .then(res => {
                console.log('Daily goal Loaded', res);
                return res;
            });
    }

    setDailyGoal(amount) {
        let store = [amount, this.getDate()];
        return this.storage.executeSql('INSERT INTO goal (amount, goal_set) VALUES (?, ?)', store)
            .then(res => {
                console.log('Daily goal Set');
            })
            .catch(e => {
                console.log('Setting goal failed', e);
            });
    }

}
