import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'sa',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
