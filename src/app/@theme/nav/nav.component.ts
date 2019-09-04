import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  private _pages: Array<string> = ['provider', 'home', 'requisition', 'product', 'cellar', 'inventory', 'warehouseMaintenance', 'brandMaintenance', 'shopping', 'typeProductsMaintenance'];
  public showPage: boolean;
  public page: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit() {
    this.showPage = false;
    this.page = 'home';
  }

  // Metodo para redireccionar paginas
  redirectToPage(page: string): any {
    this._pages.forEach(element => {
// tslint:disable-next-line: triple-equals
      if (page == element) {
        this.showPage = true;
        this.page = element;
      }
    });
  }
}
