import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class WaterMeasureService {
  litresDrank;
  progBarValue: number;
  progBarValueInPercent = 0;
  litreKey;

  constructor(public storage: StorageService) {
    this.getValueLitresDrank();
  }

  async getValueLitresDrank() {
    this.litresDrank = await this.storage.loadAmountOfDay();
  }

  addToProgressbar(addedWater) {
    this.litresDrank = this.litresDrank + addedWater;
    // this.getValueForProgBar();
    this.getValueInPercent();
  }

  async getValueForProgBar() {
    /*let litreGoal;
    await this.storage.getDailyGoal()
        .then(res => {
          this.progBarValue = this.litresDrank / litreGoal;
        });
    return this.progBarValue;*/
  }

  getValueInPercent() {
    this.progBarValueInPercent = Math.round(this.progBarValue * 100);
  }

}
