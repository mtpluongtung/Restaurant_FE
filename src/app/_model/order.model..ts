export class OrderCache {
    Name : string;
    SoLuong: number;
    DonGia : number;
    ThanhTien :number
    constructor (data : any){
        this.Name = data.Name || '';
        this.SoLuong = data.SoLuong || 0;
        this.DonGia = data.DonGia || 0;
        this.ThanhTien = data.ThanhTien || 0;
    }
}