import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FileUpload } from 'primeng/fileupload';
import { Select } from 'primeng/select';
import { environment } from '../../../environments/environment';
import { BanService } from '../../_service/ban.services';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-ban',
  templateUrl: './ban.component.html',
  styleUrls: ['./ban.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, Dialog, NgxPrintModule, FormsModule, Toast, ConfirmDialog, FileUpload, Select,Tag],
  providers: [ConfirmationService, MessageService]
})
export class BanComponent implements OnInit {
  cols: any = [

    { field: 'stt', title: 'STT', align: 'center' },
    { field: 'tenBan', title: 'Tên', align: 'center' },
    { field: 'trangThai', title: 'Trạng thái', align: 'center' },
    { field: 'soGhe', title: 'Số ghế', align: 'center' },
  ];
  Loais = [
    { label: 'Đồ ăn', value: '0' },
    { label: 'Đồ uống', value: '1' },
    { label: 'Dụng cụ', value: '3' },
  ];
  DsBan: any[] = [];
  totalRecords: number = 0; // Tổng số bản ghi
  loading: boolean = false;
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
    Page: this.pageNumber,
    PageSize: this.pageSize
  };
  displayDialog: boolean = false;
  ban: any = {};
  uploadedFiles: any[] = [];
  apiURL = environment.apiUrl;
  constructor(private banServices: BanService, private messageService: MessageService, private confirmationService : ConfirmationService) { }

  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.loading = true;
    // Gọi API lấy dữ liệu
    this.banServices.getListBan(this.search).subscribe({
      next: (data) => {
        this.DsBan = data.items; // Dữ liệu trên trang hiện tại
        this.totalRecords = data.totalRecords; // Tổng số bản ghi
        this.loading = false;
        console.log('Data:', this.DsBan);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading data:', err);
      }
    });
  }
  loadDataLazy(event: any): void {
    this.loading = true;

    // Tính số trang và kích thước trang
    this.pageNumber = Math.floor(event.first / event.rows) + 1; // Trang hiện tại
    this.pageSize = event.rows; // Kích thước trang
    this.LoadData();

  }
  SelectRow(rowData: any, event: any) {
    this.currentIteselected = rowData;
    this.selectedItem = rowData;
    this.visible = true; {

    }
  }
  onSelect(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  Xoa() {
    if (this.selectedItem.length != 1) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn bàn' });
      return;
    }
    this.confirmationService.confirm({
      header:'Xác nhận',
      message: 'Bạn có chắc chắn muốn xóa bàn này?',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Hủy',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Đồng ý',
      },
      accept: () => {
        this.banServices.XoaBan(this.selectedItem[0].id).subscribe({
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa bàn thành công' });
            this.LoadData();
            this.selectedItem = [];
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: err.error.Message });
            console.error('Error loading data:', err);
          }
        });
      }
    });
  }
  ThemShowDialog(type: number) {

    if (type == 1 && this.selectedItem.length != 1) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn 1 bàn' });
      return;
    }
    if (type == 1 && this.selectedItem.length == 1) {
      this.ban.id = this.selectedItem[0].id;
      this.ban.loai = this.selectedItem[0].loai.toString();
      this.ban.gia = this.selectedItem[0].gia;
      this.ban.tenban = this.selectedItem[0].name;
      this.ban.url = this.selectedItem[0].url;
    }
    this.displayDialog = true;
  }
  saveban() {
    console.log(this.ban);
    this.banServices.ThemBan(this.ban).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm bàn thành công' });
        this.displayDialog = false;
        this.LoadData();
        this.ban = {};
        this.selectedItem = [];
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: err.error.Message });
        console.error('Error loading data:', err);
      }
    });
  }
  getLoaiDisplay(loai: number): string {
    switch (loai) {
      case 0:
        return 'Đồ ăn';
      case 1:
        return 'Đồ uống';
      case 3:
        return 'Dụng cụ';
      default:
        return 'Không xác định';
    }
  }
}
