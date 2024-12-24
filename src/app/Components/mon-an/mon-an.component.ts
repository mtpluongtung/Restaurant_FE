import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { HoadonService } from '../../_service/hoadon.service';
import { SignalRService } from '../../_service/SignalR.service';
import { Menu } from 'primeng/menu';
import { Dialog } from 'primeng/dialog';
import { OrderDetailsComponent } from "../Order-details/Order-details.component";
import { NgxPrintModule } from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { HoaDonDetailsComponent } from '../hoa-don-details/hoa-don-details.component';
import { Tag } from 'primeng/tag';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-mon-an',
  templateUrl: './mon-an.component.html',
  styleUrls: ['./mon-an.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, DatePicker, Menu, Dialog, OrderDetailsComponent, NgxPrintModule, FormsModule, HoaDonDetailsComponent,Tag,Toast,ConfirmDialog]
})
export class MonAnComponent implements OnInit {

  constructor() { }
  cols: any = [

    { field: 'stt', title: 'STT', align: 'center' },
    { field: 'maOrder', title: 'Mã order', align: 'center' },
    { field: 'tenKhachHang', title: 'Tên khách hàng', align: 'center' },
    { field: 'phone', title: 'Số điện thoại', align: 'center' },
    { field: "tongTien", title: "Tổng tiền (VNĐ)", align: 'center' },
    { field: "ngayTao", title: "Thời gian", align: 'center' },
    { field: "thanhToan", title: "Trạng thái", align: 'center' },
  ];
  DsMonAn: any[] = [];
  totalRecords: number = 0; // Tổng số bản ghi
  loading : boolean = false;
  selectedItem: any = [];
  items: MenuItem[] | undefined;
  pageNumber: number = 1; // Trang hiện tại
  pageSize: number = 25; // Kích thước trang
  currentIteselected: any;
  visible: boolean = false;
  isShowHoaDon: boolean = false;
  orderDetail: any;
  currentDate = new Date();
  fromDate = new Date(this.currentDate);
  search: any = {
    text: '',
    fromDate: null,
    toDate: null,
    Page: this.pageNumber,
    PageSize: this.pageSize
  };
  ngOnInit() {
  }
  LoadData()
  {
    
  }
  loadDataLazy(event: any): void {
    this.loading = true;

    // Tính số trang và kích thước trang
    this.pageNumber = Math.floor(event.first / event.rows) + 1; // Trang hiện tại
    this.pageSize = event.rows; // Kích thước trang
    this.LoadData();

  }
  SelectRow(rowData: any,event: any){
    this.currentIteselected = rowData;
    this.selectedItem = rowData;
    this.visible = true;{

  }
}
}
