import { BrandMaintenance } from './../models/brand-maintenance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandMaintenanceService {
  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();
  constructor(public _http: HttpClient) { }

  getBrand(): Observable<BrandMaintenance[]> {
    return this._http.get<BrandMaintenance[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productBrands, this._headers);
  }
  createBrand(Brand: BrandMaintenance) {
    console.log(JSON.stringify(Brand));
    return this._http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productBrands, JSON.stringify(Brand), this._headers)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // Actualizar bodega
  updateBrand(productBrandId: number, Brand: BrandMaintenance) {
    Brand.productBrandId = productBrandId;
    console.log('UpdateBrand', JSON.stringify(Brand));
    return this._http.put(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productBrands + '/' + productBrandId, JSON.stringify(Brand), this._headers)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

