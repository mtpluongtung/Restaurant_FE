import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
// Import module cho QRCode
import { QRCodeComponent } from 'angularx-qrcode';
@Component({
  selector: 'app-Order-details',
  templateUrl: './Order-details.component.html',
  styleUrls: ['./Order-details.component.css'],
  standalone: true,
  imports: [QRCodeComponent,CommonModule]
})
export class OrderDetailsComponent implements OnInit {
  @Input() order: any;

  qrData: string = ''; // Dữ liệu để tạo mã QR
  constructor() { }

  ngOnInit() {
    this.qrData = location.origin + '/khach-hang/' + this.order.maOrder;
  }

}
