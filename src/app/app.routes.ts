import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { DatBanComponent } from './dat-ban/dat-ban.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dat-ban', component: DatBanComponent },
    { path: 'menu/:id', component: MenuComponent },
    { path: 'menu', component: MenuComponent }
];
