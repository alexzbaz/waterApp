import {Component} from '@angular/core';
import {WaterMeasureService} from '../../service/water-measure.service';
import {Router} from '@angular/router';
import {StorageService} from '../../service/storage.service';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})
export class SettingsPage {
    litres;
    numberOfButtons;

    constructor(public waterMeasureService: WaterMeasureService,
                public router: Router,
                public storage: StorageService,
                private modalCtrl: ModalController) {

    }

    ionViewDidEnter() {
        this.waterMeasureService.goalInMl = this.litres;
        console.log(this.litres);
    }

    saveSettings() {
        this.updateValues();
        this.router.navigateByUrl('/tabs/tab1');
    }

    async updateValues() {
        await this.storage.setDailyGoal(this.litres).then(() => {
            this.modalCtrl.dismiss();
        });
    }

    ionModalDidDismiss() {
        this.waterMeasureService.getValueForProgBar();
        this.waterMeasureService.getValueForProgbarInPercent();
    }

}
