import { Component, OnInit } from '@angular/core';
import { HoadonService } from '../../_service/hoadon.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { Tooltip } from 'primeng/tooltip';
import { Dialog } from 'primeng/dialog';
@Component({
  selector: 'app-doanh-thu',
  templateUrl: './doanh-thu.component.html',
  styleUrls: ['./doanh-thu.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule,TabsModule,ChartModule,ButtonModule, FormsModule,DatePicker,Tooltip,Dialog ]
})
export class DoanhThuComponent implements OnInit {

  constructor(private hoadonService : HoadonService) { }
  doanhThuList: any = [];
  cols!: any[];
  data: any;
  options: any;
  visible: boolean = false;
  ngOnInit() {
    this.cols = [
      { field: 'Stt', header: 'STT' },
      { field: 'ngay', header: 'Ngày' },
      { field: 'doanhThu', header: 'Doanh Thu (VNĐ)' },
      { field: 'loai', header: 'Loại doanh thu' }
  ];

    this.GetDoanhThuList();
  }
  doanhThuForm ={
    From: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 ngày trước
    To: new Date() // Ngày hiện tại
  }
GetDoanhThuList(){
  this.hoadonService.DoanhThuHoaDon(this.doanhThuForm).subscribe((res: any) => {
    this.doanhThuList = res;
    const days = res.map((item:any) => item.ngay.split('T')[0]); // Lấy ngày
    const revenues = res.map((item:any) => item.doanhThu); // Lấy doanh thu

    // Cấu hình dữ liệu cho biểu đồ
    this.data = {
      labels: days,
      datasets: [
        {
          label: 'Doanh thu (VNĐ)',
          data: revenues,
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: revenues.map((revenue:any) => {
            // Gán màu dựa trên giá trị doanh thu
            if (revenue > 6000000) return '#42A5F5'; // Màu xanh dương
            else if (revenue > 1000000) return '#66BB6A'; // Màu xanh lá
            else if (revenue > 500000) return '#FFA726'; // Màu cam
            else return '#FFA726'; // Màu cam
          }),
          tension: 0.4,
        },
      ],
    };
  });
  this.options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Doanh thu từ ${this.FormatDate(this.doanhThuForm.From)} đến ${this.FormatDate(this.doanhThuForm.To)}`, 
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ngày',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Doanh thu (VNĐ)',
        },
      },
    },
  };
}
showDetails(data: any) {
  this.hoadonService.DoanhThuChiTiet(data.ngay).subscribe((res: any) => {
    console.log('showDetails',res);
    this.visible = true;
  });

}
FormatDate(date: Date): string {
  let data = date.toISOString().split('T')[0];
  const [year, month, day] = data.split('-');
  return `${day}/${month}/${year}`;
}
}
