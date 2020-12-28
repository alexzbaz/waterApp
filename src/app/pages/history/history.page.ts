import { Component } from '@angular/core';
import {SettingsService} from "../../service/settings.service";
import {StorageService} from '../../service/storage.service';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage {
  databaseEntries = [];

  constructor(public settingsService: SettingsService,
              private storage: StorageService) {}

  async loadDatabaseEntries() {
    this.databaseEntries = await this.storage.loadAmountOfDay();
    console.log(this.databaseEntries);
  }

}
