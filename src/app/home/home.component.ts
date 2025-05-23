import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { Plot } from './model/plot.model';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    DatePipe,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    NgForOf,
  ]
})
export class HomeComponent implements OnInit {
  plots: Plot[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getPlots().subscribe((data) => {
      this.plots = data;
    });
  }
  isFutureDate(date: string | Date): boolean {
    const today = new Date();
    const monitoringDate = new Date(date);
    return monitoringDate > today;
  }
}
