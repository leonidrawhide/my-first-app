import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartTransferService } from '../chart-transfer.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  data = this.chartTransfer.getData();  

  constructor(private chartTransfer: ChartTransferService) { 
    if (registerables) Chart.register(...registerables);
  }

  ngOnInit(): void {
    const myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: this.data?.map(e => e.title),
            datasets: [{
                label: 'Продажи',
                data: this.data?.map(e => e.qtyRelease),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }

}
