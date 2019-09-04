import { Injectable } from '@angular/core';
import { Requisition } from '../models/requisition';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {
  
  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();

  constructor(public _http: HttpClient) { }

    // OBTENER TODAS LAS REQUISICIONES
    getRequisition(): Observable<Requisition[]>{
      return this._http.get<Requisition[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.requisition, this._headers);
    }

    // CREAR UNA NUEVA REQUISICION
    createRequisition(requisition:Requisition){
      debugger
      // ELIMINAR ATRIBUTO requisitionId DEL OBJETO
      delete requisition.requisitionId;
      requisition.requisitionDetails.forEach(element => {
        delete element.observation;
      });
      console.log(JSON.stringify(requisition));
      return this._http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.requisition, JSON.stringify(requisition), this._headers,)
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
