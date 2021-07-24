import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.scss' ]
})
export class MenuComponent implements OnInit, OnDestroy {

  @Input() currTitle: string | undefined;
  scrolled = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll(): void {
  //   this.scrolled = window.pageYOffset > 48;
  // }

  ngOnDestroy(): void {
  }

}
