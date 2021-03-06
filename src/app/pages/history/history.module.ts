import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryPage } from './history.page';

import { HistoryPageRoutingModule } from './history-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HistoryPageRoutingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule
    ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
