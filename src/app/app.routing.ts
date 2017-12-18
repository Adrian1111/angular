import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { ProductsComponent } from './products/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: 'products' }
];

export const routing = RouterModule.forRoot(appRoutes);
