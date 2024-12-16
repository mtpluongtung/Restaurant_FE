import { Ban } from './../_model/ban.model';
import { Component, OnInit } from '@angular/core';
import { BanService } from '../_service/ban.services';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Order } from '../_model/Order.model';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../_service/order.services';
import { Router } from '@angular/router';

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
  constructor(
    private banServices: BanService, 
    private orderServices: OrderService,
    private router: Router) { }
  visible: boolean = false;
  ngOnInit() {
    this.LoadBan();
  }
  LoadBan() {
    this.banServices.getData().subscribe((res: any) => {
      this.banList = res.data;
    }, (error) => {
      console.error('Error fetching data', error);
    });
  }
  DatBan(ban: Ban) {
    this.OrderModle.TenKhachHang = '';
    this.OrderModle.Phone = '';
    this.OrderModle.SoluongKH = 0;
    this.visible = true;
    this.OrderModle.BanId = ban.id;
  }
  AutoFilCustomer() {
    console.log('AutoFilCustomer', this.OrderModle.CustomerExample);
    if (this.OrderModle.CustomerExample) {
      this.OrderModle.TenKhachHang = 'Khách hàng ẩn danh';
      this.OrderModle.Phone = '0000000000';
    }
    else {
      this.OrderModle.TenKhachHang = '';
      this.OrderModle.Phone = '';
      this.OrderModle.SoluongKH = 0;
    }
  }
  CreateOrder() {
    this.orderServices.Create(this.OrderModle).subscribe((res: any) => {
      console.log('CreateOrder', res);
      this.visible = false;
      this.router.navigate(['/menu', res.maOrder]);
    }, (error) => {
      console.error('Error fetching data', error);
    });
  }
}
