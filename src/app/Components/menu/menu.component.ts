import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [CommonModule, Dialog, ButtonModule]
})
export class MenuComponent implements OnInit {
  visible: boolean = false;
  showHoaDon: boolean = false;
  orderId: string | null = '';
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
  selectedOrder: any[] = []
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  open(content: any) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    console.log(this.orderId)
    this.GetMenu();
    this.GetLocalStorege();
  }
  ShowDanhSachMonAn(id: number) {
    this.orderService.GetSetInMenu(id).subscribe((res: Set) => {
      this.setInMenu = res;
      this.visible = true;
    });
  }
  GetMenu() {
    this.orderService.GetMenu().subscribe((res: Menu[]) => {
      this.menulist = res;
      console.log('Menu:', this.menulist);
    });
  }
  ThemVaoOrder(item: Menu) {

    let index = this.hoadon.set.findIndex((x) => x.setId === item.id);
    if (item.type === FoodType.BUFFE && index < 0) {
      let set = new SetItem({
        setId: item.id,
        soLuong: 1,
        thanhTien: item.gia,
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

  addFood(item: Menu) {
    item.count++;
  }

  Remove(item: Menu) {
    if (item.count > 0) {
      item.count--;
    }
  }
  showHoaDonDialog() {
    this.showHoaDon = true;
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

  CofirmOrder() {
    if (this.orderId) {

      this.hoadon.maOrder = this.orderId;
      this.orderService.CofirmOrder(this.hoadon).subscribe((res) => {
        console.log(res);
        this.ResetOrder();
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














