import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class WaterMeasureService {
  litresDrank
  progBarValue: number;
  progBarValueInPercent: number = 0;
  litreKey

  constructor(public storage: StorageService) {
    this.getValueLitresDrank();
  }

  async getValueLitresDrank() {
    this.litresDrank = await this.storage.get(this.storage.getDate());
  }

  addToProgressbar(addedWater) {
    this.litresDrank = this.litresDrank + addedWater;
    this.getValueForProgBar();
    this.getValueInPercent();
  }

  async getValueForProgBar() {
    let litreGoal = await this.storage.get('Litres');
    this.progBarValue = this.litresDrank / litreGoal;
    return this.progBarValue;
  }

  getValueInPercent() {
    this.progBarValueInPercent = Math.round(this.progBarValue * 100);
  }

}
