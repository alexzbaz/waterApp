import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {DateService} from './date.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storage: SQLiteObject;

    dataLoaded = false; // Variable to show, if data has been loaded from database

    constructor(private sqlite: SQLite,
                private date: DateService) {
    }

    createDB() {
        this.sqlite.create({
            name: 'water.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            this.storage = db;
            this.createDbFormat();
        });
    }

    async createDbFormat() {
        await this.createWaterTable();
        await this.createGoalTable();
    }

    // TODO: Change Table water_drank: add timestamp instead of year, month, day, hour, minute
    createWaterTable() {
        this.storage.executeSql('CREATE TABLE IF NOT EXISTS water_drank (id INTEGER PRIMARY KEY AUTOINCREMENT, amount INTEGER, timestamp INTEGER)', [])
            .then(res => console.log('Database \'Water\' created'))
            .catch((e) => console.log("Error in Water Table", JSON.stringify(e)));
    }

    createGoalTable() {
        this.storage.executeSql('CREATE TABLE IF NOT EXISTS goal (amount INTEGER, timestamp INTEGER)', [])
            .then(res => console.log('Database \'Goal\' created'))
            .catch((e) => console.log("Error in Goal Table", JSON.stringify(e)));
    }

    // Amount comes in ml
    storeAmount(amount, timestamp) {
        let store = [amount, timestamp];
        return this.storage.executeSql('INSERT INTO water_drank (amount, timestamp) VALUES (?, ?)', store)
            .then(res => {
                console.log('Amount stored', res);
            });
    }

    loadAmountOfDay(timestamp) {
        console.log('loadAmountOfDay()');
        let date = [timestamp];

        return this.storage.executeSql('SELECT amount FROM water_drank WHERE timestamp = ?', date)
            .then(res => {
                    console.log('Amount loaded', res);
                    return res;
                }
            );
    }

    loadAllEntries() {
        console.log('loadAmountOfDay()');
        return this.storage.executeSql('SELECT * FROM water_drank')
            .then(res => {
                    console.log('Amount loaded', res);
                    return res;
                }
            );
    }

    loadAmountOfWeek(timestamp) {
        console.log('loadAmountOfWeek()');
        let date = [timestamp];

        return this.storage.executeSql('SELECT amount FROM water_drank WHERE timestamp = ?', date)
            .then(res => {
                    console.log('Amount loaded', res);
                    return res;
                }
            );
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

    getDailyGoal() {
        return this.storage.executeSql('SELECT * FROM goal ORDER BY goal_set DESC LIMIT 1', [])
            .then((res: any) => {
                return res.rows.item(0).amount;
            })
            .catch((e) => {
                console.log("Error in Get Daily Goal", JSON.stringify(e));
            });
    }

    setDailyGoal(amount) {
        let store = [amount, this.date.getDate()];
        return this.storage.executeSql('INSERT INTO goal (amount, goal_set) VALUES (?, ?)', store)
            .then(res => {
                console.log('Daily goal Set');
            })
            .catch(e => {
                console.log('Setting goal failed', e);
            });
    }

}
