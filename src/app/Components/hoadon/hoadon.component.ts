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
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, DatePicker, Menu, Dialog, OrderDetailsComponent, NgxPrintModule, FormsModule, HoaDonDetailsComponent,Tag,Toast,ConfirmDialog ],
  providers: [MessageService,ConfirmationService]
})
export class HoadonComponent implements OnInit {
  DsHoaDon: any[] = [];
  selectedItem: any = [];
  items: MenuItem[] | undefined;
  loading: boolean = false;
  totalRecords: number = 0; // Tổng số bản ghi
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
  cols: any = [

    { field: 'stt', title: 'STT', align: 'center' },
    { field: 'maOrder', title: 'Mã order', align: 'center' },
    { field: 'tenKhachHang', title: 'Tên khách hàng', align: 'center' },
    { field: 'phone', title: 'Số điện thoại', align: 'center' },
    { field: "tongTien", title: "Tổng tiền (VNĐ)", align: 'center' },
    { field: "ngayTao", title: "Thời gian", align: 'center' },
    { field: "thanhToan", title: "Trạng thái", align: 'center' },
  ]
  @ViewChild('menu') menu!: Menu;

  constructor(
    private hoaDonServices: HoadonService,
    private signalRService: SignalRService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService

  ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.messages$.subscribe((messages: string) => {
      console.log(messages);
      this.LoadData();
    });
    this.items = [
      {
        label: 'Tác vụ',
        items: [
          {
            label: 'In phiếu order',
            icon: 'pi pi-cart-arrow-down',
            command: () => {
              this.ShowOrderDetail();
            }
          },
          {
            label: 'In hóa đơn',
            icon: 'pi pi-list-check',
            command: () => {
              this.ShowHoDonDetail();
            }
          },
          {
            label: 'Thanh toán',
            icon: 'pi pi-dollar',
            command: () => {
              this.ThanhToan();
            }
          }
        ]
      }
    ];
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
    this.hoaDonServices.getHoaDon(this.search).subscribe({
      next: (data) => {
        this.DsHoaDon = data.items; // Dữ liệu trên trang hiện tại
        this.totalRecords = data.totalRecords; // Tổng số bản ghi
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading data:', err);
      }
    });
  }
  SelectRow(data: any, event: Event): void {
    this.currentIteselected = data;
    this.menu.toggle(event); // Mở menu tại vị trí click
  }

  ShowOrderDetail(): void {
    this.hoaDonServices.GetOrderDetail(this.currentIteselected.maOrder).subscribe(data => {
      this.orderDetail = data.data;
      this.visible = true;
    });

  }
  ShowHoDonDetail(): void {
    this.hoaDonServices.GetOrderDetail(this.currentIteselected.maOrder).subscribe(data => {
      this.orderDetail = data.data;
      this.isShowHoaDon = true;
    });
  }
  ThanhToan(): void 
  {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn thanh toán hóa đơn này không ?',
      header: 'Thanh toán hóa đơn ' + this.currentIteselected.id ,
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
        this.hoaDonServices.thanhToan(this.currentIteselected.id).subscribe(data => {
          if(data)
          {
            this.LoadData();
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Thanh toán thành công',
            });
          }
        },err=>{
          this.messageService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: err.error.Message,
          });
        });
      },
      reject: () => {
         
      },
  });
   
  }
}
