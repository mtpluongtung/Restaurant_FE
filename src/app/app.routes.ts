import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/Home.component';
import { DatBanComponent } from './Components/dat-ban/dat-ban.component';
import { MenuComponent } from './Components/menu/menu.component';
import { AdminComponent } from './Components/admin/admin.component';
import { HoadonComponent } from './Components/hoadon/hoadon.component';
import { BepComponent } from './Components/bep/bep.component';
import { DoanhThuComponent } from './Components/doanh-thu/doanh-thu.component';
import { KhachHangComponent } from './Components/khach-hang/khach-hang.component';
import { MonAnComponent } from './Components/mon-an/mon-an.component';
import { SetComponent } from './Components/set/set.component';
import { BanComponent } from './Components/ban/ban.component';

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
    { path: 'khach-hang/:maOrder', component: KhachHangComponent },
    { path: 'mon-an', component: MonAnComponent },
    { path: 'set', component: SetComponent },
    { path: 'cau-hinh-ban', component: BanComponent }
];
