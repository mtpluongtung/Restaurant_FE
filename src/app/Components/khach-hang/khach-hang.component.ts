import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dialog } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HoaDon, SetItem, MonAnItem } from '../../_model/hoadon';
import { OrderService } from '../../_service/order.services';
import { FoodType } from '../../_share/constans';
import { Menu } from '../../type/Menu';
import { Set } from '../../type/set';
import { SignalRService } from '../../_service/SignalR.service';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-khach-hang',
  templateUrl: './khach-hang.component.html',
  styleUrls: ['./khach-hang.component.css'],
  standalone: true,
  imports: [CommonModule, Dialog, ButtonModule, Toast, OverlayBadgeModule],
  providers: [MessageService]
})
export class KhachHangComponent implements OnInit {
  visible: boolean = false;
  showHoaDon: boolean = false;
  orderId: string | null = '';
  banId: number = 0;
  slKhachHang: number = 0;
  menulist: Menu[] = [];
  setInMenu: Set = {
    id: 0,
    name: '',
    url: '',
    gia: 0,
    type: 0,
    monAn: []
  };
  hoadon: HoaDon = {
    maHoaDon: '',
    banId: 0,
    maOrder: '',
    ngayTao: new Date(),
    tongTien: 0,
    thanhToan: false,
    set: [],
    monAn: []
  };
  totalOrder: number = 0;
  Thanhtien: number = 0;
  selectedOrder: any[] = [];
  sections: any = [];
  showWarning: boolean = false;
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private signalRService: SignalRService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('maOrder');
    this.banId = Number(this.route.snapshot.paramMap.get('banId'));
    this.slKhachHang = Number(this.route.snapshot.paramMap.get('slkh'));
    console.log(this.banId)
    console.log(this.orderId)
    this.GetMenu();
    this.GetLocalStorege();
    this.signalRService.startConnection();
    this.checkOrientation();
  }
  GetMenu() {
    this.orderService.GetMenu().subscribe((res: Menu[]) => {
      this.menulist = res;
      console.log('Menu:', this.menulist);
    });
  }
  @HostListener('window:resize')
  onResize() {
    this.checkOrientation(); // Kiểm tra khi thay đổi kích thước màn hình
  }

  checkOrientation() {
    const isPortrait =
      window.innerWidth < 844 && window.innerHeight > window.innerWidth;
    this.showWarning = isPortrait; // Hiển thị thông báo nếu điều kiện thỏa mãn
  }
  showHoaDonDialog() {
    this.showHoaDon = true;
  }
  scrollToSection(id: string, event: Event) {
    event.preventDefault(); // Ngăn hành vi mặc định
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  onScroll(event: any) {
    const container = event.target as HTMLElement;
    const sections = container.querySelectorAll('.section');
    const scrollTop = container.scrollTop;

    sections.forEach((section: Element) => {
      const rect = section.getBoundingClientRect();
      const id = section.getAttribute('id');

      // Kiểm tra nếu phần tử nằm trong vùng nhìn thấy của `menu-item`
      if (rect.top >= 0 && rect.top <= container.clientHeight / 2) {
        // Active tab tương ứng
        const activeLink = document.querySelector(
          `.menu-group a[href="#${id}"]`
        );
        document
          .querySelectorAll('.menu-group a')
          .forEach((link) => link.classList.remove('active'));
        activeLink?.classList.add('active');
      }
    });
  }
  getIdForType(type: number): string {
    switch (type) {
      case 2:
        return 'buffe-combo';
      case 0:
        return 'do-an';
      case 1:
        return 'do-uong';
      default:
        return '';
    }
  }
  addFood(item: Menu) {
    item.count++;
  }
  Remove(item: Menu) {
    if (item.count > 0) {
      item.count--;
    }
  }
  ShowDanhSachMonAn(id: number) {
    this.orderService.GetSetInMenu(id).subscribe((res: Set) => {
      this.setInMenu = res;
      this.visible = true;
    });
  }
  ThemVaoOrder(item: Menu) {

    let index = this.hoadon.set.findIndex((x) => x.setId === item.id);
    if (item.type === FoodType.BUFFE && index < 0) {
      let set = new SetItem({
        setId: item.id,
        soLuong: this.slKhachHang,
        thanhTien: item.gia * this.slKhachHang,
        name: item.name,
        gia: item.gia
      });
      this.hoadon.set.push(set);
    }
    if (item.type === FoodType.MON_AN) {
      let index = this.hoadon.monAn.findIndex((x) => x.monAnId === item.id);
      if (index > -1) {
        console.log('zzz', item)
        this.hoadon.monAn[index].soLuong += item.count;
        this.hoadon.monAn[index].thanhTien += item.gia * item.count;
      }
      else {
        let monAn = new MonAnItem({
          monAnId: item.id,
          soLuong: item.count,
          thanhTien: item.gia * item.count,
          name: item.name,
          gia: item.gia
        });
        this.hoadon.monAn.push(monAn);
      }
      item.count = 0;

    }
    this.SumHoaDon();
  }

  SumHoaDon() {

    this.totalOrder = this.hoadon.set.length + this.hoadon.monAn.length;

    let totalThanhTienMonAn = this.hoadon.monAn.reduce((total, monAn) => {
      return total + monAn.thanhTien;
    }, 0);
    let totalThanhSet = this.hoadon.set.reduce((total, set) => {
      return total + set.thanhTien;
    }, 0);
    this.Thanhtien = totalThanhTienMonAn + totalThanhSet;
    this.SetLocalStorege();
  }
  SetLocalStorege() {
    if (this.orderId) {
      localStorage.setItem(this.orderId, JSON.stringify(this.hoadon))
    }
  }
  GetLocalStorege() {
    if (this.orderId) {
      let cache = localStorage.getItem(this.orderId)
      if (cache) {
        this.hoadon = JSON.parse(cache);
        this.SumHoaDon();
      }
    }
  }
  addFoodCache(item: MonAnItem) {
    item.soLuong++;
    item.thanhTien = item.gia * item.soLuong;
    this.SumHoaDon();
  }

  RemoveFoodCache(item: MonAnItem) {
    if (item.soLuong > 0) {
      item.soLuong--;
      item.thanhTien = item.gia * item.soLuong;
      this.SumHoaDon();
    }
  }
  CofirmOrder() {
    if (this.orderId) {

      this.hoadon.maOrder = this.orderId;
      this.hoadon.banId = this.banId;
      this.hoadon.tongTien = this.Thanhtien;
      this.orderService.CofirmOrder(this.hoadon).subscribe((res) => {
        this.messageService.add({severity:'success', summary:'Thành công', detail:'Đặt món thành công'});
        this.signalRService.sendMessage("Có order mới");
        this.ResetOrder();
      },err=>{
        this.messageService.add({severity:'error', summary:'Thất bại', detail:'Đặt món thất bại'});
      })
    }

  }
  ResetOrder() {
    this.showHoaDon = false;
    localStorage.removeItem(this.hoadon.maOrder);
    this.totalOrder = 0;
    this.Thanhtien = 0;
    this.hoadon = {
      maHoaDon: '',
      banId: 0,
      maOrder: '',
      ngayTao: new Date(),
      tongTien: 0,
      thanhToan: false,
      set: [],
      monAn: []
    };
  }

}
