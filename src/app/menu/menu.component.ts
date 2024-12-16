import { Component, OnInit } from '@angular/core';
import { SetMeal } from '../type/FoodItem';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dialog } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    standalone: true,
    imports: [CommonModule,Dialog]
})
export class MenuComponent implements OnInit {
  visible : boolean = false;
  orderId: string | null = '';

  constructor(private modalService: NgbModal,private route: ActivatedRoute) {}

  open(content: any, set: SetMeal) {
    this.selectedSet = set;
    this.modalService.open(content);
  }

  selectedSet: SetMeal | null = null;
  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    console.log('Order ID:', this.orderId);
  }
  ShowDanhSachMonAn(){
    this.visible=true;
  }
}
