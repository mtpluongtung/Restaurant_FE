import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { HoadonService } from '../../_service/hoadon.service';
import { SignalRService } from '../../_service/SignalR.service';

@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CalendarModule]
})
export class HoadonComponent implements OnInit {
  DsHopDong: any[] = [];
  selectedItem: any = [];
  items: MenuItem[] | undefined;
  loading: boolean = false;
  totalRecords: number = 0; // Tổng số bản ghi
  pageNumber: number = 1; // Trang hiện tại
  pageSize: number = 25; // Kích thước trang
  cols: any = [

    { field: 'stt', title: 'STT', align: 'center' },
    { field: 'maOrder', title: 'Mã order', align: 'center' },
    { field: "tongTien", title: "Tổng tiền (VNĐ)", align: 'center' },
    { field: "ngayTao", title: "Ngày tạo", align: 'center' },
    { field: "thanhToan", title: "Trạng thái", align: 'center' },
  ]

  constructor(
    private hoaDonServices: HoadonService,
    private signalRService: SignalRService

  ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.messages$.subscribe((messages: string) => {
      console.log(messages);
      this.LoadData();
    });
  }
  loadDataLazy(event: any): void {
    this.loading = true;

    // Tính số trang và kích thước trang
    this.pageNumber = Math.floor(event.first / event.rows) + 1; // Trang hiện tại
    this.pageSize = event.rows; // Kích thước trang
    this.LoadData();

  }
  LoadData(): void {
    // Gọi API lấy dữ liệu
    this.hoaDonServices.getHoaDon(this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        this.DsHopDong = data.items; // Dữ liệu trên trang hiện tại
        this.totalRecords = data.totalRecords; // Tổng số bản ghi
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading data:', err);
      }
    });
  }
}
