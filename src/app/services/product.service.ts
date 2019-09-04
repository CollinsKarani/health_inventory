import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Brand } from '../models/product';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();
  constructor(public _http: HttpClient) { 
  }

  // OBTENER TODOS LOS PRODUCTOS
  getProducts(): Observable<Product[]>{
    return this._http.get<Product[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products, this._headers);
  }

    // INICIO OBTENER MANTENIMIENTOS NECESARIOS DE PRODUCTOS
  getTypeProduct() {
    return this._http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.typeProducts, this._headers);
  }

  getBrands(): any {
    return this._http
    .get<Brand>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productBrands, this._headers)
  }

  getStorages(){
    return this._http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productStorages, this._headers);
  }

  getProviders() {
    return this._http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers, this._headers);
  }

  // CREAR NUEVO PRODUCTO
  createProduct(products:Product){
    console.log(JSON.stringify(products));
    return this._http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products, JSON.stringify(products), this._headers,)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // EDITAR PRODUCTOS
  updateProduct(idProduct:number, products:Product){
    products.productId = idProduct;

    console.log("UpdateProduct", JSON.stringify(products));
    
    return this._http.put(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products + "/" + idProduct,  JSON.stringify(products), this._headers)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

   // ELIMINAR PRODUCTOS
  deleteProduct(idProduct:number){
    return this._http.delete(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products + "/" + idProduct , this._headers)
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
