import { Component, OnInit } from '@angular/core';
import { SetMeal } from '../type/FoodItem';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  styleUrls: ['./menu.component.css'],
  imports: [CommonModule]
})
export class MenuComponent implements OnInit {
  setMeals: SetMeal[] = [
    {
      id: 1,
      imageUrl: 'https://cdn.lauphan.com:9998/api/file/img?PathFile=/Menu/37/menu1685431458177.png',
      name: 'Set Món 1',
      items: [
        { id: 1, name: 'Món 1', description: 'Mô tả món 1', imageUrl: 'url-to-image1' },
        { id: 2, name: 'Món 2', description: 'Mô tả món 2', imageUrl: 'url-to-image2' }
      ]
    },
    {
      id: 1,
      name: 'Set Món 2',
      imageUrl: 'https://cdn.lauphan.com:9998/api/file/img?PathFile=/Menu/37/menu1685431458177.png',
      items: [
        { id: 1, name: 'Món 1', description: 'Mô tả món 1', imageUrl: 'url-to-image1' },
        { id: 2, name: 'Món 2', description: 'Mô tả món 2', imageUrl: 'url-to-image2' }
      ]
    },
    {
      id: 1,
      name: 'Set Món 3',
      imageUrl: 'https://cdn.lauphan.com:9998/api/file/img?PathFile=/Menu/37/menu1685431458177.png',
      items: [
        { id: 1, name: 'Món 1', description: 'Mô tả món 1', imageUrl: 'url-to-image1' },
        { id: 2, name: 'Món 2', description: 'Mô tả món 2', imageUrl: 'url-to-image2' }
      ]
    },
    {
      id: 1,
      name: 'Set Món 4',
      imageUrl: 'https://cdn.lauphan.com:9998/api/file/img?PathFile=/Menu/37/menu1685431458177.png',
      items: [
        { id: 1, name: 'Món 1', description: 'Mô tả món 1', imageUrl: 'url-to-image1' },
        { id: 2, name: 'Món 2', description: 'Mô tả món 2', imageUrl: 'url-to-image2' }
      ]
    },
  ];

  constructor(private modalService: NgbModal) {}

  open(content: any, set: SetMeal) {
    this.selectedSet = set;
    this.modalService.open(content);
  }

  selectedSet: SetMeal | null = null;
  ngOnInit() {
  }
  
}
