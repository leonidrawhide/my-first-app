import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  heroes: Hero[] = [];

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => {
          this.heroes = heroes
          console.log(heroes)
          // for (let i = 0; i < 10; i++) {
          //   console.log(this.heroes.heroes[i])
          // }
          // // console.log(this.heroes)
        });
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
