import { Component } from '@angular/core';
import {SettingsService} from "../../service/settings.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(public settingsService: SettingsService) {}

}
