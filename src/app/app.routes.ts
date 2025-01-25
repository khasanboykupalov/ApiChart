import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';

export const routes: Routes = [

    {path: "", redirectTo:"bar-chart", pathMatch:"full"},
    {path: "bar-chart", component: BarChartComponent},
    {path: "pie-chart", component: PieChartComponent}

];
