import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from '../../service/settings.service';
import {WaterMeasureService} from '../../service/water-measure.service';
import {IonSlides, ModalController} from '@ionic/angular';
import {StorageService} from '../../service/storage.service';
import {SettingsPage} from '../settings/settings.page';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    @ViewChild('slides') slides: IonSlides;
    slideOptions = {
        initialSlide: 0,
        slidesPerView: 1,
        autoplay: true,
        speed: 750,
    };

    waterAdder = [100, 200, 500, 700, 1000, 1500];
    firstView = true;

    constructor(public settingsService: SettingsService,
                public waterMeasureService: WaterMeasureService,
                public storage: StorageService,
                public modalCtrl: ModalController) {
    }

    async ngOnInit() {
        /*if (this.storage.dataLoaded === false) {*/
        await this.waterMeasureService.getDailyGoal();
        await this.waterMeasureService.getTodaysLitresDrank();
        this.storage.dataLoaded = true;
        if (this.waterMeasureService.goalInMl === undefined || this.waterMeasureService.goalInMl === null) {
            await this.showWelcomeModal();
            console.log("show welcome modal");
        } else {
            this.waterMeasureService.getValueForProgBar();
            this.waterMeasureService.getValueForProgbarInPercent();
        }
    }

    addWater(ml) {
        this.waterMeasureService.addToProgressbar(ml);
        let timestamp = new Date().getTime();
        this.storage.storeAmount(ml, timestamp);
    }

    // When revisiting the page, the slides have to be started "manually"
    ionSlidesDidLoad(slides: IonSlides) {
        slides.startAutoplay();
    }

    async showWelcomeModal() {
        if (this.firstView) {
            let welcomeModal = await this.modalCtrl.create({component: SettingsPage});
            return await welcomeModal.present();
        }
    }

}
