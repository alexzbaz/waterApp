import {Component, ViewChild} from '@angular/core';
import {SettingsService} from "../../service/settings.service";
import {WaterMeasureService} from "../../service/water-measure.service";
import {IonSlides, ModalController} from "@ionic/angular";
import {StorageService} from "../../service/storage.service";
import {WelcomePage} from "../welcome/welcome.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('slides') slides: IonSlides;
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 750,
  }

  waterAdder = [100, 200, 500, 700, 1000, 1500];
  firstView = true;

  constructor(public settingsService: SettingsService,
              public waterMeasureService: WaterMeasureService,
              public storage: StorageService,
              public modalCtrl: ModalController) {
    this.showWelcomeModal();
  }

  ionViewDidLoad() {
    this.waterMeasureService.getValueForProgBar();
  }

  addWater(ml) {
    this.waterMeasureService.addToProgressbar(ml);
    this.storage.set(this.storage.getDate(), this.waterMeasureService.litresDrank);
  }

  // When revisiting the page, the slides have to be started "manually"
  ionSlidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  async showWelcomeModal() {
    if (this.firstView) {
      let welcomeModal = await this.modalCtrl.create({component: WelcomePage});
      welcomeModal.onDidDismiss().then(data => {
        console.log(data);
        let litres = data['data'];
        this.storage.set('Litres', litres);
      })
    return await welcomeModal.present();
    }
  }

}
