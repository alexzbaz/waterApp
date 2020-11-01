import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../service/settings.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(public settingsService: SettingsService) { }

  ngOnInit() {
  }

}
