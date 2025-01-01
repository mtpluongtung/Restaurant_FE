import { NhanVien } from './../../_model/NhanVien';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MonAn } from '../../_model/monAn.model';
import { FileUpload } from 'primeng/fileupload';
import { Select } from 'primeng/select';
import { environment } from '../../../environments/environment';
import { NhanVienService } from '../../_service/nhan-vien.service';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-nhan-vien',
  templateUrl: './nhan-vien.component.html',
  styleUrls: ['./nhan-vien.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, Dialog, NgxPrintModule, FormsModule, Toast, ConfirmDialog, FileUpload, Select,Menu],
  providers: [ConfirmationService, MessageService]
})
export class NhanVienComponent implements OnInit {
  cols: any = [

    { field: 'stt', title: 'STT', align: 'center' },
    { field: 'tenNhanvien', title: 'Họ tên', align: 'center' },
    { field: 'maNhanvien', title: 'Mã Nhân Viên', align: 'center' },
    { field: 'phone', title: 'Số điện thoại', align: 'center' },
    { field: 'email', title: 'Email', align: 'center' },
    { field: 'capBac', title: 'Cấp bậc', align: 'center' },
    { field: 'viTri', title: 'Vị trí', align: 'center' },
    { field: 'address', title: 'Địa', align: 'center' },

  ];
  DsNhanVien: any[] = [];
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
  NhanVien: NhanVien = new NhanVien();
  uploadedFiles: any[] = [];
  apiURL = environment.apiUrl;
   @ViewChild('menu') menu!: Menu;
  constructor(private nhanVienServives : NhanVienService , private confirmationService : ConfirmationService , private messageService : MessageService) { }

  ngOnInit() {
    this.LoadData();
    this.items = [
      {
        label: 'Tác vụ',
        items: [
          {
            label: 'Tạo ca làm việc',
            icon: 'pi pi-cart-arrow-down'
          },
          {
            label: 'Tạo URL Checkin',
            icon: 'pi pi-list-check'
          },
          {
            label: 'Tạo URL CheckOut',
            icon: 'pi pi-dollar'
          },
          {
            label: 'Tạo Châm công Nhân viên',
            icon: 'pi pi-dollar'
          },
          {
            label: 'Tổng hợp công',
            icon: 'pi pi-dollar'
          }
        ]
      }
    ];
  }
  LoadData() {
    this.loading = true;
    // Gọi API lấy dữ liệu
    this.nhanVienServives.getDanhSachNhanVien(this.search).subscribe({
      next: (data) => {
        this.DsNhanVien = data.items; // Dữ liệu trên trang hiện tại
        this.totalRecords = data.totalRecords; // Tổng số bản ghi
        this.loading = false;
  
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
    this.menu.toggle(event); // Mở menu tại vị trí click
  }
  onSelect(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  Xoa() {
    if (this.selectedItem.length != 1) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn món ăn' });
      return;
    }
    this.confirmationService.confirm({
      header:'Xác nhận',
      message: 'Bạn có chắc chắn muốn xóa món ăn này?',
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
        this.nhanVienServives.xoaNhanVien(this.selectedItem[0].id).subscribe({
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa món ăn thành công' });
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
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn 1 món ăn' });
      return;
    }
    if (type == 1 && this.selectedItem.length == 1) {
      this.NhanVien.id = this.selectedItem[0].id;
      this.NhanVien.maNhanvien = this.selectedItem[0].maNhanvien.toString();
      this.NhanVien.tenNhanvien = this.selectedItem[0].tenNhanvien;
      this.NhanVien.phone = this.selectedItem[0].phone;
      this.NhanVien.address = this.selectedItem[0].address;
      this.NhanVien.email = this.selectedItem[0].email;
      this.NhanVien.viTri = this.selectedItem[0].viTri;
      this.NhanVien.capBac = this.selectedItem[0].capBac;
      this.NhanVien.token = this.selectedItem[0].token;
    }
    this.displayDialog = true;
  }
  saveNhanVien() {
    this.nhanVienServives.CapNhatNhanVien(this.NhanVien).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thành công' });
        this.displayDialog = false;
        this.LoadData();
        this.NhanVien = new NhanVien();
        this.selectedItem = [];
        this.uploadedFiles = [];
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: err.error.Message });
        console.error('Error loading data:', err);
      }
    });
  }

}
