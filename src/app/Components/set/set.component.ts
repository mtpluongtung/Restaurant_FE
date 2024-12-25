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
import { MonAnService } from '../../_service/mon-an.service';
import { MonAn } from '../../_model/monAn.model';
import { FileUpload } from 'primeng/fileupload';
import { Select } from 'primeng/select';
import { environment } from '../../../environments/environment';
import { SetService } from '../../_service/set.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, Dialog, NgxPrintModule, FormsModule, Toast, ConfirmDialog, FileUpload, Select],
  providers: [ConfirmationService, MessageService]
})
export class SetComponent implements OnInit {
  cols: any = [

    { field: 'stt', title: 'STT', align: 'center' },
    { field: 'name', title: 'Tên', align: 'center' },
    { field: 'gia', title: 'Đơn giá', align: 'center' },
    { field: "url", title: "Hình ảnh", align: 'center' },
  ];
  colsMonAn: any = [

    { field: 'stt', title: 'STT', align: 'center' },
    { field: 'name', title: 'Tên', align: 'center' },
    { field: "url", title: "Hình ảnh", align: 'center' }
    
  ];
  Loais = [
    { label: 'Đồ ăn', value: '0' },
    { label: 'Đồ uống', value: '1' },
    { label: 'Dụng cụ', value: '3' },
  ];
  DsSet: any[] = [];
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
  searchMonAn: any = {
    text: '',
    Page: this.pageNumber,
    PageSize: this.pageSize
  };
  displayDialog: boolean = false;
  monAn: MonAn = new MonAn();
  uploadedFiles: any[] = [];
  apiURL = environment.apiUrl;
  ShowDsMonAn : boolean = false;
  DsMonAn : any[] = [];
  selectedItemMonAn : any = [];
  DsMonAnSelected : any = []; 
  constructor(private setServices: SetService, private messageService: MessageService, private confirmationService : ConfirmationService, private monAnServices : MonAnService)  { }

  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.loading = true;
    // Gọi API lấy dữ liệu
    this.setServices.getListMonAn(this.search).subscribe({
      next: (data) => {
        this.DsSet = data.items; // Dữ liệu trên trang hiện tại
        this.totalRecords = data.totalRecords; // Tổng số bản ghi
        this.loading = false;
        console.log('Data:', this.DsSet);
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
        this.setServices.xoaMonAn(this.selectedItem[0].id).subscribe({
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
      this.monAn.id = this.selectedItem[0].id;
      this.monAn.loai = this.selectedItem[0].loai.toString();
      this.monAn.gia = this.selectedItem[0].gia;
      this.monAn.tenMonAn = this.selectedItem[0].name;
      this.monAn.url = this.selectedItem[0].url;
    }
    this.displayDialog = true;
  }
  saveMonAn() {
    let fromData = new FormData();
    fromData.append('Name', this.monAn.tenMonAn);
    fromData.append('Gia', this.monAn.gia.toString());
    fromData.append('File', this.uploadedFiles[0]);
    for (let key of this.DsMonAnSelected) {
      fromData.append('MonAn', key.id)
    }
    fromData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    this.setServices.addMonAn(fromData).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm món ăn thành công' });
        this.displayDialog = false;
        this.LoadData();
        this.monAn = new MonAn();
        this.selectedItem = [];
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: "Vui lòng liên hệ quản trị viên" });
        console.error('Error loading data:', err);
      }
    });
  }
  ThemMonAnVaoSet(){
    this.LoadDanhSachMonAn();
    this.ShowDsMonAn = true;
  }
  LoadDanhSachMonAn() {
    this.loading = true;
    // Gọi API lấy dữ liệu
    this.monAnServices.getListMonAn(this.searchMonAn).subscribe({
      next: (data) => {
        this.DsMonAn = data.data.items; // Dữ liệu trên trang hiện tại
        this.totalRecords = data.data.totalRecords; // Tổng số bản ghi
        this.loading = false;
        console.log('Data:', this.DsMonAn);
      },
      error: (err) => {
        this.loading = false;
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
  ChonMonAn(){
    this.DsMonAnSelected = this.selectedItemMonAn;
    this.ShowDsMonAn = false;
  }
  XoaMonAn(data:any){
    if (Array.isArray(this.DsMonAnSelected)) {
      this.DsMonAnSelected = this.DsMonAnSelected.filter(item => item !== data);
  } else if (this.DsMonAnSelected?.remove) {
      // If `remove` is a valid method (custom or library-based)
      this.DsMonAnSelected.remove(data);
  } else {
      console.error("selectedItemMonAn does not support item removal");
  }
  }
}
