import {AfterContentInit, Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective {
  
  @Input() public autoFocus: boolean;
  public constructor(private el:ElementRef) { }

  public ngAfterContentInit(): void {
    setTimeout(()=>{
      this.el.nativeElement.focus();
    }, 500)
   }

}
