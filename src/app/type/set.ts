export interface Set {
    id: number;
    name: string;
    url: string;
    gia:number;
    type: number;
    monAn:MonAn[];
}
export interface MonAn {
    id: number;
    name: string;
    url: string;
    gia:number;
    soLuong:number;
}