import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class WaterMeasureService {
    drankToday = 0;
    goalInMl: number;
    progBarValue: number;
    progBarValueInPercent: number;

    constructor(public storage: StorageService) {
    }

    async getTodaysLitresDrank() {
        await this.storage.loadAmountOfDay()
            .then(res => {
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.drankToday = this.drankToday + res.rows.item(i).amount;
                    }
                }
            });
        console.log('LITRES DRANK', this.drankToday);
    }

    addToProgressbar(addedWater) {
        this.drankToday = this.drankToday + addedWater;
        this.getValueForProgBar();
        this.getValueForProgbarInPercent();
    }

    async getDailyGoal() {
        console.log("getDailyGoal()");
        this.goalInMl = await this.storage.getDailyGoal();
    }

    getValueForProgBar() {
        this.progBarValue = this.drankToday / this.goalInMl;
        console.log(this.progBarValue);
    }

    getValueForProgbarInPercent() {
        if (this.goalInMl > 0) {
            this.progBarValueInPercent = Math.round(this.progBarValue * 100);
        } else {
            this.progBarValueInPercent = 0;
        }
    }

}
