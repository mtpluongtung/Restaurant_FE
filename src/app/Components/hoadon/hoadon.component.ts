import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { HoadonService } from '../../_service/hoadon.service';
@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css'],
  standalone: true,
  imports: [TableModule,CommonModule,ButtonModule,CalendarModule ]
})
export class HoadonComponent implements OnInit {
  DsHopDong:any[]=[];
  selectedItem:any=[];
  items: MenuItem[] | undefined;
  loading:boolean=false;
  cols:any=[

    { field: 'stt', title: 'STT',  align: 'center' },
    { field: 'maOrder', title: 'Mã order',  align: 'center' },
    { field: "tongTien", title: "Tổng tiền",  align: 'center' },
    { field: "ngayTao", title: "Ngày tạo",  align: 'center' },
    { field: "thanhToan", title: "Trạng thái", align: 'center' },
  ]

  constructor(private hoaDonServices : HoadonService) { }

  ngOnInit() {
    this.LoadData();
  }
  LoadData()
  {
    this.loading=true;
    this.hoaDonServices.getHoaDon().subscribe(data=>{
      this.DsHopDong=data;
      this.loading=false;
      console.log(this.DsHopDong)
    })
  }
}
