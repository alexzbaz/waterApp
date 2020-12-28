import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  millilitres: number;
  constructor(public storage: StorageService,
              public router: Router,
              public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  setLitres() {
    this.storage.setDailyGoal(this.millilitres);
    this.modalCtrl.dismiss(this.millilitres);
  }

}
