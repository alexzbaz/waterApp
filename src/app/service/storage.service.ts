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
        this.storage.executeSql('CREATE TABLE water_drank (amount, year, month, day, hour, minute)')
            .then(res => console.log("Database 'Water Drank' created"));
        this.storage.executeSql('CREATE TABLE goal (amount, goal_set)')
            .then(res => console.log("Database 'Goal' created"));
    }

    // Amount comes in ml
    storeAmount(amount) {
        let store = [amount, this.getYear(), this.getMonth(), this.getDay(), this.getHour(), this.getMinute()];
        return this.storage.executeSql('INSERT INTO water_drank (amount, year, month, day, hour, minute) VALUES (?, ?, ?, ?, ?, ?)', store)
            .then(res => {
                console.log("Amount stored");
            });
    }

    loadAmountOfDay() {
        let date = [this.getYear(), this.getMonth(), this.getDay()];
        return this.storage.executeSql('SELECT * FROM water_drank WHERE year = ?, month = ?, day = ?', date)
            .then((res: any) => {
                console.log("Amount loaded");
            });
    }

    getYear() {
        return this.datePipe.transform(new Date(), 'yyyy');
    }

    getMonth() {
        return this.datePipe.transform(new Date(), 'MM');
    }

    getDay() {
        return this.datePipe.transform(new Date(), 'dd');
    }

    getHour() {
        return this.datePipe.transform(new Date(), 'HH');
    }

    getMinute() {
        return this.datePipe.transform(new Date(), 'mm');
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
                console.log("Delete Successful");
            })
            .catch(res => {
                console.log("Delete Unsuccessful", res);
            });
    }

    getDailyGoal() {
        return this.storage.executeSql('SELECT * FROM goal WHERE timestamp = ?')
            .then(res => {
                console.log("Daily goal Loaded");
            });
    }

    setDailyGoal(amount) {
        let store = [amount, this.getDate()];
        return this.storage.executeSql('INSERT INTO goal (amount, goal_set) VALUES (?, ?)', store)
            .then(res => {
                console.log("Daily goal Set");
            })
            .catch(e => {
                console.log("Setting goal failed", e);
            });
    }

}
