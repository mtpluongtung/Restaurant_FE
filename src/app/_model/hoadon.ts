export class HoaDon {
    maHoaDon: string;
    banId: number;
    maOrder: string;
    ngayTao: Date;
    tongTien: number;
    thanhToan: boolean;
    set: SetItem[];
    monAn: MonAnItem[];
  
    constructor(data: any) {
      this.maHoaDon = data.maHoaDon;
      this.banId = data.banId;
      this.maOrder = data.maOrder;
      this.ngayTao = new Date(data.ngayTao);
      this.tongTien = data.tongTien;
      this.thanhToan = data.thanhToan;
      this.set = data.set.map((item: any) => new SetItem(item));
      this.monAn = data.monAn.map((item: any) => new MonAnItem(item));
    }
  }
  
  export class SetItem {
    setId: number;
    soLuong: number;
    thanhTien: number;
  
    constructor(data: SetItem) {
      this.setId = data.setId;
      this.soLuong = data.soLuong;
      this.thanhTien = data.thanhTien;
    }
  }
  
  export class MonAnItem {
    monAnId: number;
    soLuong: number;
    thanhTien: number;
  
    constructor(data: any) {
      this.monAnId = data.monAnId;
      this.soLuong = data.soLuong;
      this.thanhTien = data.thanhTien;
    }
  }
  