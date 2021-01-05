import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class WaterMeasureService {
    drankToday = 0;
    goalInMl: number;
    progBarValue: number;
    progBarValueInPercent = 0;
    litreKey;

    constructor(public storage: StorageService) {
        // this.getValueLitresDrank();
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
        // this.getValueForProgBar();
        this.getValueForProgbarInPercent();
    }

    // First get today's amount of water, then get daily goal
    async getValueForProgBar() {
        await this.getTodaysLitresDrank();
        await this.storage.getDailyGoal()
            .then(res => {
                this.goalInMl = res.rows.item(0).amount;
            });

        this.progBarValue = this.drankToday / this.goalInMl;
        return this.progBarValue;
    }

    getValueForProgbarInPercent() {
        this.progBarValueInPercent = Math.round(this.progBarValue * 100);
    }

}
