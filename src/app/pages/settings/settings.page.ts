import { Component } from '@angular/core';
import {WaterMeasureService} from "../../service/water-measure.service";
import {Router} from "@angular/router";
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  settingsForm;
  litres;

  constructor(public waterMeasureService: WaterMeasureService,
              public router: Router,
              public storage: StorageService) {

  }

  ionViewDidEnter() {
    this.litres = this.storage.getDailyGoal();
    console.log(this.litres)

  }

  saveSettings() {
    this.updateValues()
    this.router.navigateByUrl('/tabs/tab1');
  }

  async updateValues() {
    await this.storage.storeAmount(this.litres);
    this.waterMeasureService.getValueForProgBar();
    this.waterMeasureService.getValueInPercent();
  }

}
