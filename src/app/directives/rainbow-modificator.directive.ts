import { Directive, ElementRef,  Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRainbowModificator]',
})
export class RainbowModificatorDirective {
  constructor(private elem: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elem.nativeElement, 'anim-text-flow')
  }
}
