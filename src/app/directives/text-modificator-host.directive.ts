import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appTextModificatorHost]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
}
})
export class TextModificatorHostDirective {
  @Input() selectedBackColor = 'rgba(255, 255, 255, 0)';
  @Input() selectedText = "";

  backColor: string = 'rgba(255, 255, 255, 0)';
  tmpColor: string = '';
  textAfter: string = this.selectedText;
  tmpText: string = this.element.nativeElement.innerHTML;

  constructor(private element: ElementRef) { 
    
  }

  @HostBinding("style.background") get getBackColor(){
    return this.backColor
  }

  onMouseEnter() {
      this.tmpText = this.element.nativeElement.innerHTML
      this.tmpColor = this.element.nativeElement.style.background;

      this.backColor = this.selectedBackColor;
      this.element.nativeElement.innerHTML = this.tmpText + ' ' + this.selectedText
  }
 
  onMouseLeave() {
    this.backColor = this.tmpColor;
    this.element.nativeElement.innerHTML = this.tmpText
  }


}
