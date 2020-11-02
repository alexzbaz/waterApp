import { Component } from '@angular/core';
import {SettingsService} from "../../service/settings.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  progressbarValue = 0.25;
  progressbarValueInPercent: number;
  waterAdder = [100, 200, 500, 700, 1000, 1500];

  constructor(public settingsService: SettingsService) {
    this.getValueInPercent();
  }

  getValueInPercent() {
    this.progressbarValueInPercent = this.progressbarValue * 100;
  }

  progressbarAbsolute() {

  }

}
