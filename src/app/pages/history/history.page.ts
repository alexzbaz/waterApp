import { Component } from '@angular/core';
import {SettingsService} from "../../service/settings.service";

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage {

  constructor(public settingsService: SettingsService) {}

}
