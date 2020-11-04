import { Component } from '@angular/core';
import {WaterMeasureService} from "../../service/water-measure.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  settingsForm;
  litres;

  constructor(public waterMeasureService: WaterMeasureService,
              public router: Router) {
    this.litres = waterMeasureService.getLitres();
  }

  saveSettings() {
    this.updateValues()
    this.router.navigateByUrl('/tabs/tab1');
  }

  updateValues() {
    this.waterMeasureService.setLitres(this.litres)
    this.waterMeasureService.getValueForProgBar();
    this.waterMeasureService.getValueInPercent();
  }

}
