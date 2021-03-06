import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class WaterMeasureService {
    drankToday = 0;
    goalInMl: number = null;
    progBarValue: number;
    progBarValueInPercent: number;

    constructor(public storage: StorageService) {
    }

    async getTodaysLitresDrank() {
        let day = this.getSpecificDay();
        await this.storage.loadAmountOfDay(day)
            .then(res => {
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.drankToday = this.drankToday + res.rows.item(i).amount;
                    }
                }
            });
        console.log('LITRES DRANK', this.drankToday);
    }

    getSpecificDay() {
        // TODO: Return specific day as timestamp
    }

    addToProgressbar(addedWater) {
        this.drankToday = this.drankToday + addedWater;
        this.getValueForProgBar();
        this.getValueForProgbarInPercent();
    }

    async getDailyGoal() {
        this.goalInMl = await this.storage.getDailyGoal();
    }

    getValueForProgBar() {
        this.progBarValue = this.drankToday / this.goalInMl;
        console.log("getValueForProgBar()");
    }

    getValueForProgbarInPercent() {
        if (this.goalInMl > 0) {
            this.progBarValueInPercent = Math.round(this.progBarValue * 100);
        } else {
            this.progBarValueInPercent = 0;
        }
    }

}
