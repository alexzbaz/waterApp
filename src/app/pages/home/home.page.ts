import {Component, ViewChild} from '@angular/core';
import {SettingsService} from "../../service/settings.service";
import {WaterMeasureService} from "../../service/water-measure.service";
import {IonSlides} from "@ionic/angular";

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

  constructor(public settingsService: SettingsService,
              public waterMeasureService: WaterMeasureService) {
    this.waterMeasureService.getValueForProgBar();
  }

  ionSlidesDidLoad() {
    this.slides.startAutoplay();
  }

  addWater(ml) {
    this.waterMeasureService.addToProgressbar(ml)
  }

}
