import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CalendarPageRoutingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule
    ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
