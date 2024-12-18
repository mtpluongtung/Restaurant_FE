import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/Home.component';
import { DatBanComponent } from './Components/dat-ban/dat-ban.component';
import { MenuComponent } from './Components/menu/menu.component';
import { AdminComponent } from './Components/admin/admin.component';
import { HoadonComponent } from './Components/hoadon/hoadon.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dat-ban', component: DatBanComponent },
    { path: 'menu/:id', component: MenuComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'hoa-don', component: HoadonComponent },
];
