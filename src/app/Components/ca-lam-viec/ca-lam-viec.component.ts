import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { CaLamViecService } from '../../_service/ca-lam-viec.service';
import { CaLamViecModel } from '../../_model/ca-lam-viec';

@Component({
  selector: 'app-ca-lam-viec',
  templateUrl: './ca-lam-viec.component.html',
  styleUrls: ['./ca-lam-viec.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, Dialog, NgxPrintModule, FormsModule, Toast, ConfirmDialog, FileUpload, Select],
  providers: [ConfirmationService, MessageService]
})
export class CaLamViecComponent implements OnInit {
  cols: any = [

    { field: 'stt', title: 'STT', align: 'center' },
    { field: 'loaiCa', title: 'Tên', align: 'center' },
    { field: 'gioBatDauCa', title: 'Thời gian bắt đầu(h)', align: 'center' },
    { field: 'gioKetThucCa', title: 'Thời gian kết thúc(h)', align: 'center' }
  ];
  DsCaLamViec: any[] = [];
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
  caLamViec: CaLamViecModel = new CaLamViecModel();
  uploadedFiles: any[] = [];
  apiURL = environment.apiUrl;
  constructor(private caLamViecServices: CaLamViecService, private messageService: MessageService, private confirmationService : ConfirmationService) { }

  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.loading = true;
    // Gọi API lấy dữ liệu
    this.caLamViecServices.GetDsCaLamViec().subscribe({
      next: (data) => {
        this.DsCaLamViec = data; // Dữ liệu trên trang hiện tại
        this.loading = false;
        console.log('Data:', this.DsCaLamViec);
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
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn ca' });
      return;
    }
    this.confirmationService.confirm({
      header:'Xác nhận',
      message: 'Bạn có chắc chắn muốn xóa ca này?',
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
        this.caLamViecServices.XoaCaLamViec(this.selectedItem[0].id).subscribe({
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa ca thành công' });
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
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn 1 ca' });
      return;
    }
    if (type == 1 && this.selectedItem.length == 1) {
      this.caLamViec.id = this.selectedItem[0].id;
      this.caLamViec.gioBatDauCa = this.selectedItem[0].gioBatDauCa;
      this.caLamViec.gioKetThucCa = this.selectedItem[0].gioKetThucCa;
      this.caLamViec.loaiCa = this.selectedItem[0].loaiCa;
     
    }
    this.displayDialog = true;
  }
  saveCaLamViec() {
    
    this.caLamViecServices.ThemCaLamViec(this.caLamViec).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm ca thành công' });
        this.displayDialog = false;
        this.LoadData();
        this.caLamViec = new CaLamViecModel();
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
