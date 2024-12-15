import { Ban } from './../_model/ban.model';
import { Component, OnInit } from '@angular/core';
import { BanService } from '../_service/ban.services';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Order } from '../_model/Order.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dat-ban',
    templateUrl: './dat-ban.component.html',
    styleUrls: ['./dat-ban.component.css'],
    imports: [CommonModule, DialogModule, FormsModule],
    standalone: true
})
export class DatBanComponent implements OnInit {

  banList: Ban[] = [];
  OrderModle: Order = new Order();
  constructor(private banServices: BanService) { }
  visible: boolean = false;
  ngOnInit() {
    this.banServices.getData().subscribe((res: any) => {
      this.banList = res.data;
    }, (error) => {
      console.error('Error fetching data', error);
    });
  }
  DatBan(ban: Ban) {
    console.log('Dat ban', ban);
    this.visible = true;
  }
}
