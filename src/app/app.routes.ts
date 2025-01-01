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
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './_helper/auth.guard';
import { NhanVienComponent } from './Components/nhan-vien/nhan-vien.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent },
    { path: 'dat-ban', component: DatBanComponent , canActivate: [AuthGuard]},
    { path: 'menu/:maOrder/:banId/:slkh', component: MenuComponent  , canActivate: [AuthGuard]},
    { path: 'menu', component: MenuComponent  , canActivate: [AuthGuard]},
    { path: 'admin', component: AdminComponent  , canActivate: [AuthGuard]},
    { path: 'hoa-don', component: HoadonComponent , canActivate: [AuthGuard]},
    { path: 'bep', component: BepComponent  , canActivate: [AuthGuard]},
    { path: 'doanh-thu', component: DoanhThuComponent , canActivate: [AuthGuard] },
    { path: 'khach-hang/:maOrder', component: KhachHangComponent },
    { path: 'mon-an', component: MonAnComponent  , canActivate: [AuthGuard]},
    { path: 'set', component: SetComponent  , canActivate: [AuthGuard]},
    { path: 'cau-hinh-ban', component: BanComponent  , canActivate: [AuthGuard]},
    { path: 'nhan-vien', component: NhanVienComponent  , canActivate: [AuthGuard]}
];
