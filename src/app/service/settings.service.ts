import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  dailyWaterIntake: number;

  constructor(private router: Router) { }

  navigateToSettings() {
    this.router.navigateByUrl('/settings');
  }

  saveSettings() {

  }
}
