import { Provider, Cities } from './../models/provider';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();
  constructor(public _http: HttpClient) { }

  getProvider(): Observable<Provider[]> {
    return this._http.get<Provider[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers, this._headers);
  }

  getCities(): Observable<Cities[]> {
    return this._http.get<Cities[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.cities, this._headers);
  }

  // CREAR NUEVO PROVEEDOR
  createProvider(provider:Provider){
    console.log(JSON.stringify(provider));
    return this._http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers, JSON.stringify(provider), this._headers,)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // EDITAR PROVEEDOR
  updateProvider(idProvider:number, provider:Provider){

    provider.providersId = idProvider;

    console.log("UpdateProvider", JSON.stringify(provider));
    
    return this._http.put(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers + "/" + idProvider,  JSON.stringify(provider), this._headers)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // ELIMINAR PROVEEDOR
  deleteProvider(idProvider:number){
    return this._http.delete(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers + "/" + idProvider , this._headers)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  // CAPTURAR LOS ERRORES DE LOS SERVICIOS
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
