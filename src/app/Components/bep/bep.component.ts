import { SignalRService } from './../../_service/SignalR.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { Menu } from 'primeng/menu';
import { Dialog } from 'primeng/dialog';
import { BepService } from '../../_service/bep.service';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Bep } from '../../_model/bep';
import { Toast } from 'primeng/toast';
import { Tag } from 'primeng/tag';
@Component({
  selector: 'app-bep',
  templateUrl: './bep.component.html',
  styleUrls: ['./bep.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CalendarModule, Menu, Dialog, Select,FormsModule,Toast,Tag],
  providers: [MessageService]
})

export class BepComponent implements OnInit {
  DsMonAn: any[] = [];
  selectedItem: any = [];
  items: MenuItem[] | undefined;
  loading: boolean = false;
  totalRecords: number = 0; // Tổng số bản ghi
  pageNumber: number = 1; // Trang hiện tại
  pageSize: number = 25; // Kích thước trang
  currentIteselected: Bep = new Bep();
  visible: boolean = false;
  countdownTimers: string[] = []; // thời gian chờ
  orderDetail: any;
  cols: any = [

    { field: 'stt', title: 'STT', align: 'center' },
    { field: 'name', title: 'Tên món ăn', align: 'center' },
    { field: "tenBan", title: "Bàn order", align: 'center' },
    { field: "soLuong", title: "Số lượng", align: 'center' },
    { field: "createdDate", title: "Thời gian", align: 'center' },
    { field: "trangThai", title: "Trạng thái", align: 'center' },
    { field: "countdown", title: "Thời gian hoàn thành", align: 'center' },
  ]
  TrangThaiBep: any = [
    { name: 'Đang chờ', value: 0 },
    { name: 'Đang thực hiện', value: 1 },
    { name: 'Hoàn thành', value: 2 }
  ];
  @ViewChild('menu') menu!: Menu;
  intervals: any[] = [];
  constructor(private bepService: BepService, private signalRService: SignalRService,private messageService: MessageService) { }

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
  LoadData() {
    // Gọi API lấy dữ liệu
    this.bepService.getDanhSachMonAn(this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        this.DsMonAn = data.items; // Dữ liệu trên trang hiện tại
        this.totalRecords = data.totalRecords; // Tổng số bản ghi
        this.loading = false;
        this.CountDownTimer(this.DsMonAn)
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading data:', err);
      }
    });
  }
  SelectRow(data: any, event: Event): void {
    this.visible = true;
    this.currentIteselected = {...data};
    console.log(this.currentIteselected);
  }

  UpdateBep(){
    this.bepService.UpdateBep(this.currentIteselected).subscribe({
      next: (data) => {
        this.visible = false;
        this.countdownTimers = [];
        this.clearAllIntervals();
        this.LoadData();
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Hành động hoàn tất!',
        });
      },
      error: (err) => {
       
        this.messageService.add({
          severity: 'error',
          summary: "Thất bại",
          detail: err.error.Message,
        });
      }
    });
  }

  CountDownTimer(data: any): void {
    const currentTime = new Date().getTime(); // Lấy thời gian hiện tại (millisecond)

    data?.forEach((item: any, index: number) => {
      // Xóa interval cũ nếu có
      if (this.intervals[index]) {
        clearInterval(this.intervals[index]);
      }
  
      let elapsedTime = 0;
  
      if (item.trangThai === 2) {
        // Nếu trạng thái là 2, tính thời gian giữa SuccessTime và CreateDate
        const successTime = new Date(item.succesTime).getTime();
        const createDate = new Date(item.createdDate).getTime();
        elapsedTime = Math.max(0, Math.floor((successTime - createDate) / 1000));
      } else {
        // Nếu trạng thái khác 2, tính thời gian từ CreateDate đến thời gian hiện tại
        const createDate = new Date(item.createdDate).getTime();
        elapsedTime = Math.max(0, Math.floor((currentTime - createDate) / 1000));
  
        // Tạo interval để tăng thời gian
        this.intervals[index] = setInterval(() => {
          elapsedTime++;
          this.countdownTimers[index] = this.formatTime(elapsedTime);
        }, 1000);
      }
  
      // Hiển thị thời gian ban đầu
      this.countdownTimers[index] = this.formatTime(elapsedTime);
    });
  }
  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
    }
  }

  clearAllIntervals(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
  }

}
