import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite/ngx";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storage;

    constructor(private sqlite: SQLite) {
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
        this.storage.executeSql('CREATE TABLE water_drank (amount, timestamp)')
            .then(res => console.log("Database 'Water Drank' created"));
        this.storage.executeSql('CREATE TABLE goal (amount)')
            .then(res => console.log("Database 'Goal' created"))
    }

    // Amount comes in ml
    storeAmount(amount) {
        return this.storage.executeSql('INSERT INTO water_drank (amount) VALUES (?)', [amount])
            .then(res => {
                console.log("Amount stored");
            });
    }

    loadAmountToday() {
        // TODO: Function for get date
        let date;
        return this.storage.executeSql('SELECT * FROM water_drank WHERE timestamp = ?', [date])
            .then((res: any) => {

            });
    }

    loadAmountWeekly() {

    }

    loadAmountMonthly() {

    }

    async deleteEntry(timestamp) {
        await this.storage.executeSql('DELETE FROM water_drank WHERE timestamp = ?', [timestamp])
            .then(res => {
                console.log("Delete Successful");
            })
            .catch(res => {
                console.log("Delete Unsuccessful", res);
            });
    }

    getDailyGoal() {
        // TODO: DATE
        let timestamp;
        return this.storage.executeSql('SELECT * FROM goal WHERE timestamp = ?', [timestamp])
            .then(res => {
                console.log("Daily goal Loaded");
            });
    }

    setDailyGoal(amount) {
        return this.storage.executeSql('INSERT INTO goal (amount) VALUES (?)', [amount])
            .then(res => {
                console.log("Daily goal Loaded");
            });
    }

    getDate() {
        let today = new Date();
        let todayString = String(today.getDate());
        console.log(todayString);
        return todayString;
    }

}
