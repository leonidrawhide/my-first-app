import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { IpService } from './ip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private ipService: IpService) {}

  title = 'Tour of Heroes!';

  background: ThemePalette = 'primary';

  ngOnInit(): void {
    this.ipService.getHostName()
  }
}
