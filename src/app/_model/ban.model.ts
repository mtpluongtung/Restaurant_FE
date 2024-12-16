export class Ban {
    id: number;
    tenBan: string;
    trangThai: boolean;
    tang: string;
    soNguoi: number;
    soGhe: number;
  
    constructor(
      id: number,
      tenBan: string,
      trangThai: boolean,
      tang: string,
      soNguoi: number,
      soGhe: number
    ) {
      this.id = id;
      this.tenBan = tenBan;
      this.trangThai = trangThai;
      this.tang = tang;
      this.soNguoi = soNguoi;
      this.soGhe = soGhe;
    }
  }
  