import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InspectionsComponent } from './inspections/inspections.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inspections', component: InspectionsComponent }
];
