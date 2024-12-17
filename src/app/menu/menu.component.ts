import { Component, OnInit } from '@angular/core';
import { Menu } from '../type/Menu';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dialog } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../_service/order.services';
import { Set } from '../type/set';
import { ButtonModule } from 'primeng/button';
import { FoodType } from '../_share/constans';
import { HoaDon, MonAnItem, SetItem } from '../_model/hoadon';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [CommonModule, Dialog, ButtonModule]
})
export class MenuComponent implements OnInit {
  visible: boolean = false;
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
    this.GetMenu();
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
    if (this.orderId !== null) {
      this.hoadon.maOrder = this.orderId;
    }
    let index = this.hoadon.set.findIndex((x) => x.setId === item.id);
    if (item.type === FoodType.BUFFE && index < 0) {
        let set = new SetItem({
          setId: item.id,
          soLuong: 1,
          thanhTien: item.gia,
        });
        this.hoadon.set.push(set);
    }
    if (item.type === FoodType.MON_AN) {
      let index = this.hoadon.monAn.findIndex((x) => x.monAnId === item.id);
      if(index> -1){
        this.hoadon.monAn[index].soLuong += item.count;
        this.hoadon.monAn[index].thanhTien += item.gia * item.count;
    }
    else{
      let monAn = new MonAnItem({
        monAnId: item.id,
        soLuong: item.count,
        thanhTien: item.gia * item.count,
      });
      this.hoadon.monAn.push(monAn);
    }
    item.count = 0;
  }
    this.totalOrder = this.hoadon.set.length + this.hoadon.monAn.length;
    console.log('Order:', this.hoadon);
  }

  addFood(item: Menu) {
    item.count++;
  }

  Remove(item: Menu) {
    if (item.count > 0) {
      item.count--;
    }
  }
}
