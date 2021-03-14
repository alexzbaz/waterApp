import {Component} from '@angular/core';
import {SettingsService} from '../../service/settings.service';
import {StorageService} from '../../service/storage.service';
import {ModalController} from '@ionic/angular';
import {CalendarPage} from './calendar/calendar.page';

@Component({
    selector: 'app-history',
    templateUrl: 'history.page.html',
    styleUrls: ['history.page.scss']
})
export class HistoryPage {
    databaseEntries = [];

    constructor(public settingsService: SettingsService,
                private storage: StorageService,
                private modalCtrl: ModalController) {
    }

    ionViewWillEnter() {
        this.loadDatabaseEntries();
    }

    async loadDatabaseEntries() {
        this.databaseEntries = [];
        await this.storage.loadAmountOfDay().then((res) => {
            for (let i = 0; i < res.rows.length; i++) {
                this.databaseEntries.push(res.rows.item(i));
                console.log('DATABASE ENTRIES', this.databaseEntries);
            }
        });
    }

    async openCalendarModal() {
        const modal = await this.modalCtrl.create({
            component: CalendarPage,
            cssClass: 'calendar-modal-css'
        });



        return await modal.present();
    }

}

