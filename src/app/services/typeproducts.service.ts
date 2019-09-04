import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TypeProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class TypeproductsService {

  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();
  constructor(public _http: HttpClient) { }

  getTypeProduct(): Observable<TypeProduct[]> {
    return this._http.get<TypeProduct[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.typeProducts, this._headers);
  }
  createTypeProduct(typeProducts: TypeProduct) {
    console.log(JSON.stringify(typeProducts));
    return this._http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.typeProducts, JSON.stringify(typeProducts), this._headers, )
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  // Actualizar bodega
  updateTypeProduct(typeProductId: number, typeProducts: TypeProduct) {
    typeProducts.typeProductId = typeProductId;
    console.log('UpdateStorage', JSON.stringify(typeProducts));
    return this._http.put(this._endpoint.integrationUris.base + this._endpoint.integrationUris.typeProducts + '/' + typeProductId,  JSON.stringify(typeProducts), this._headers)
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

