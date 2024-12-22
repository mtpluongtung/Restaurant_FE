import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
// Import module cho QRCode
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-hoa-don-details',
  templateUrl: './hoa-don-details.component.html',
  styleUrls: ['./hoa-don-details.component.css'],
  standalone: true,
  imports: [QRCodeComponent,CommonModule]
})
export class HoaDonDetailsComponent implements OnInit {

  @Input() order: any;
 
   qrData: string = ''; // Dữ liệu để tạo mã QR
   constructor() { }
 
   ngOnInit() {
     this.qrData = location.origin + '/menu/' + this.order.maOrder;
   }
 
}
