import { WarehouseMaintenance } from './../models/warehouse-maintenance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WarehouseMaintenanceService {
  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();
  constructor(public _http: HttpClient) { }

  getStorage(): Observable<WarehouseMaintenance[]> {
    return this._http.get<WarehouseMaintenance[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productStorages, this._headers);
  }
  createStorage(Storage: WarehouseMaintenance) {
    console.log(JSON.stringify(Storage));
    return this._http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productStorages, JSON.stringify(Storage), this._headers, )
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  // Actualizar bodega
  updateStorage(storageId: number, Storage: WarehouseMaintenance) {
    Storage.storageId = storageId;
    console.log('UpdateStorage', JSON.stringify(Storage));
    return this._http.put(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productStorages + '/' + storageId,  JSON.stringify(Storage), this._headers)
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

