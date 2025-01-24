import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { SuccessPageComponent } from './success-page/success-page.component';

export const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: '' },
    { path: '', component: AccueilComponent },
    { path: 'success', component: SuccessPageComponent },
];
