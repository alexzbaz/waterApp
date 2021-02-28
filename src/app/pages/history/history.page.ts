import {Component} from '@angular/core';
import {SettingsService} from '../../service/settings.service';
import {StorageService} from '../../service/storage.service';

@Component({
    selector: 'app-history',
    templateUrl: 'history.page.html',
    styleUrls: ['history.page.scss']
})
export class HistoryPage {
    databaseEntries = [];

    constructor(public settingsService: SettingsService,
                private storage: StorageService) {
        this.loadDatabaseEntries();
    }

    async loadDatabaseEntries() {
        await this.storage.loadAmountOfDay().then((res) => {
            for (let i = 0; i < res.rows.length; i++) {
                this.databaseEntries.push(res.rows.item(i));
                console.log('DATABASE ENTRIES', this.databaseEntries);
            }
        });
    }

}
