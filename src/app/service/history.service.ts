import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {DateService} from './date.service';
import {DatabaseEntry} from '../interface/databaseEntry';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    databaseEntries = [];
    timestamp = '';

    constructor(private storage: StorageService,
                private dateService: DateService) {
    }

    async loadDatabaseEntries() {
        this.databaseEntries = [];
        let databaseEntry: DatabaseEntry;
        await this.storage.loadAllEntries().then((res) => {
            for (let i = 0; i < res.rows.length; i++) {
                databaseEntry = {
                    type: 'WATER',
                    amount: res.rows.item(i).amount,
                    timestamp: res.rows.item(i).timestamp
                };

                let timestampEntry = this.dateService.getTimestamp(res.rows.item(i).timestamp);
                let timestampChanged: boolean = this.checkTimestamp(timestampEntry);
                if (timestampChanged === true) {
                    let timestampMessage = this.timestamp;
                    this.databaseEntries.push({type: 'TIMESTAMP', amount: timestampMessage, timestamp: null});
                }
                this.databaseEntries.push(databaseEntry);
                console.log('DATABASE ENTRIES', this.databaseEntries);
            }
        });
    }

    checkTimestamp(waterEntryTimestamp) {
        if (waterEntryTimestamp !== this.timestamp) {
            this.timestamp = waterEntryTimestamp;
            return true;
        } else {
            return false;
        }
    }
}
