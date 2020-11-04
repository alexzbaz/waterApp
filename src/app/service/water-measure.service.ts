import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaterMeasureService {
  litresPerDay: number = 3000;
  litresDrank: number = 0;
  progBarValue: number;
  progBarValueInPercent: number = 0;

  constructor() { }

  getLitres() {
    return this.litresPerDay;
  }

  setLitres(litres) {
    this.litresPerDay = litres;
  }

  addToProgressbar(addedWater) {
    this.litresDrank = this.litresDrank + addedWater;
    this.getValueForProgBar();
    this.getValueInPercent();
  }

  getValueForProgBar() {
    this.progBarValue = this.litresDrank / this.litresPerDay;
    return this.progBarValue;
  }

  getValueInPercent() {
    this.progBarValueInPercent = Math.round(this.progBarValue * 100);
  }

}
