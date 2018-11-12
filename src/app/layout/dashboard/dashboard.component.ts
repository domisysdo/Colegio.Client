import { AfterViewInit, Component, ElementRef, OnInit, Injector } from '@angular/core';
import * as Chart from 'chart.js';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends AppComponentBase implements OnInit, AfterViewInit {

  constructor(
    private element: ElementRef,
    injector: Injector
) {
    super(injector);
}

  ngOnInit() {}

  ngAfterViewInit() {
    const el = <HTMLCanvasElement>document.getElementById('visitors_chart');
    const ctx = el.getContext('2d');
    const visitors_chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Sessions',
            data: [20, 18, 40, 50, 35, 24, 40],
            borderColor: 'rgba(117,54,230,0.9)',
            backgroundColor: 'rgba(117,54,230,0.9)',
            pointBackgroundColor: 'rgba(117,54,230,0.9)',
            pointBorderColor: 'rgba(117,54,230,0.9)',
            borderWidth: 1,
            pointBorderWidth: 1,
            pointRadius: 0,
            pointHitRadius: 30
          },
          {
            label: 'Data 2',
            data: [28, 48, 40, 35, 70, 33, 32],
            backgroundColor: 'rgba(255,64,129, 0.7)',
            borderColor: 'rgba(255,64,129, 0.7)',
            pointBackgroundColor: 'rgba(255,64,129, 0.7)',
            pointBorderColor: 'rgba(255,64,129, 0.7)',
            borderWidth: 1,
            pointBorderWidth: 1,
            pointRadius: 0,
            pointHitRadius: 30
          },
          {
            label: 'Page Views',
            data: [64, 54, 60, 65, 52, 85, 48],
            borderColor: 'rgba(104,218,221,1)',
            backgroundColor: 'rgba(104,218,221,1)',
            pointBackgroundColor: 'rgba(104,218,221,1)',
            pointBorderColor: 'rgba(104,218,221,1)',
            borderWidth: 1,
            pointBorderWidth: 1,
            pointRadius: 0,
            pointHitRadius: 30
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false
              }
            }
          ]
        },
        legend: {
          labels: {
            boxWidth: 12
          }
        }
      }
    });
  }
}
