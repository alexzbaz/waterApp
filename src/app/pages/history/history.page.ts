import {Component} from '@angular/core';
import {SettingsService} from '../../service/settings.service';
import {StorageService} from '../../service/storage.service';
import {ModalController} from '@ionic/angular';
import {CalendarPage} from './calendar/calendar.page';
import {HistoryService} from '../../service/history.service';

@Component({
    selector: 'app-history',
    templateUrl: 'history.page.html',
    styleUrls: ['history.page.scss']
})
export class HistoryPage {

    constructor(public settingsService: SettingsService,
                private storage: StorageService,
                private modalCtrl: ModalController,
                private historyService: HistoryService) {
    }

    ionViewWillEnter() {
        this.historyService.loadDatabaseEntries();
    }

    async openCalendarModal() {
        const modal = await this.modalCtrl.create({
            component: CalendarPage,
            cssClass: 'calendar-modal-css'
        });

        return await modal.present();
    }

}

