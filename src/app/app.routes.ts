import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/Home.component';
import { DatBanComponent } from './Components/dat-ban/dat-ban.component';
import { MenuComponent } from './Components/menu/menu.component';
import { AdminComponent } from './Components/admin/admin.component';
import { HoadonComponent } from './Components/hoadon/hoadon.component';
import { BepComponent } from './Components/bep/bep.component';
import { DoanhThuComponent } from './Components/doanh-thu/doanh-thu.component';
import { KhachHangComponent } from './Components/khach-hang/khach-hang.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dat-ban', component: DatBanComponent },
    { path: 'menu/:maOrder/:banId/:slkh', component: MenuComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'hoa-don', component: HoadonComponent },
    { path: 'bep', component: BepComponent },
    { path: 'doanh-thu', component: DoanhThuComponent },
    { path: 'khach-hang/:maOrder', component: KhachHangComponent }
];
