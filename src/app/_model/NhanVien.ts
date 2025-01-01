export class NhanVien {
    id: number;
    tenNhanvien: string;
    maNhanvien: string;
    phone: string;
    address: string;
    email: string;
    viTri: string;
    capBac: number;
    token: string;
  
    constructor(
    ) {
        this.id = 0;
      this.tenNhanvien = "";
      this.maNhanvien = "";
      this.phone = "";
      this.address = "";
      this.email = "";
      this.viTri = "";
      this.capBac = 0;
        this.token = "";
    }
}