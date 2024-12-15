import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { DatBanComponent } from './dat-ban/dat-ban.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'dat-ban', component: DatBanComponent },
    { path: 'menu', component: MenuComponent }
];
