import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { TypeProduct } from 'src/app/models/product';
import { TypeproductsService } from "./../../services/typeproducts.service";

@Component({
  selector: 'app-typeproducts',
  templateUrl: './typeproducts.component.html',
  styleUrls: ['./typeproducts.component.scss'],
  providers: [NotificationsComponent]
})
export class TypeproductsComponent implements OnInit {
  public openWindowOf: string;
  public isActive: string;
  public _typeProducts: Array<TypeProduct>;
  private _newtypeProducts: TypeProduct;
  private _idtypeProducts: number;
  private _updatetypeProducts: TypeProduct;

 // Trabajando con tablas
 public dataSource: any = [];
 displayedColumns: string[] = ['select', 'options', 'typeProductName'];
 public selection = new SelectionModel<TypeProduct>(true, []);

 //DECLARANDO E INICIALIZNDO OBJETO FILTERPROVIDER
 private dataStorageFiltered: TypeProduct;


 private status: boolean = false;
 typeProductsForm: FormGroup;

  constructor(private _notification: NotificationsComponent, private _typeProductsService: TypeproductsService) {
   this.initFilteredProvider();
   this.initForm('');

 }


 ngOnInit() {
 this.getTypeProduct();
 console.log('this._brand ngOnInit', this._typeProducts); 
 }

 initForm( typeRequest: string): void {
   // Variables temp. ||
   let typeProductName = typeRequest == 'edit' ? this.dataStorageFiltered.typeProductName : '';
   
   // Instanciando Formulario Reactivo
   this.typeProductsForm = new FormGroup({
    typeProductName: new FormControl(typeProductName, Validators.required),

   });
 }

 initFilteredProvider() {
   this.dataStorageFiltered = {
    typeProductId: 0,
    typeProductName: '',
   }
 }

 getTypeProduct(): void {
       this._typeProductsService.getTypeProduct()
     .subscribe((data: TypeProduct[]) => {
       console.log('getTypeProduct SERVICE', data);
       this.dataSource = new MatTableDataSource<TypeProduct>(data);
       return this._typeProducts = data;
   });
 }


 createUser(): void{ 
   this.initForm('');
   this._newtypeProducts = new TypeProduct;
 }

 onCreateTypeProduct(): void {
   this._newtypeProducts = this.typeProductsForm.value;
   console.log('Imprimiendo DATA del FORM', this._newtypeProducts);
   this._typeProductsService.createTypeProduct(this._newtypeProducts)
     .subscribe((data: TypeProduct ) => {
       console.log('Suceess typeProduct');
       this.openTypeWindow('', '');
       this._notification.notificationOpen('success', 'success!', 'Tipo de producto creado con exito');
       this.getTypeProduct();
     }, error => console.log('error ' + error));
 }

 onEditTypeProduct(): void{
   this._updatetypeProducts = this.typeProductsForm.value;
   console.log('Print data form by UpdateTypeProducts', this._updatetypeProducts);
   this._typeProductsService.updateTypeProduct(this._idtypeProducts, this._updatetypeProducts)
     .subscribe((data: TypeProduct ) => {
       console.log('Success Update tipo de producto');
       this.openTypeWindow('', '');
       this._notification.notificationOpen('success', 'success!', 'Tipo de producto Modificado con exito');
       this.getTypeProduct();
     }, error => console.log('Upps => ' + error));
 }

 /** Si el número de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

 /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, la selección se limpia. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }



 openTypeWindow (type: string, code: string): void {
   this.openWindowOf = type;
   let btnAdd = document.getElementById('add');
   let btnfilter = document.getElementById('filter');
   let inputCode = document.getElementById('providerName');

   if (type == 'create'){
      btnAdd.classList.add('active');
      btnfilter.classList.remove('active');
      this.createUser();
   }else if (type == 'filter'){
     btnAdd.classList.remove('active');
     btnfilter.classList.add('active');
   }else if (type == 'edit') {
     this.addDataInputForm(code);
     inputCode ? inputCode.focus() : null;
   }else{
     btnAdd.classList.remove('active');
     btnfilter.classList.remove('active');
   }

 }

 saveItem(){
   this.openTypeWindow('', '');
   this._notification.notificationOpen('success', 'success!', 'El tipo de producto se ha almacenado');
 }

 editItem(){
   this.openTypeWindow('', '');
   this._notification.notificationOpen('success', 'success!', 'El tipo de producto se ha almacenado');
 }

 onSubmit() {
   // TODO: Use EventEmitter with form value
   console.warn(this.typeProductsForm.value);
 }

 addDataInputForm(code) {
       console.log(code);
       this._idtypeProducts = code;
       this.dataStorageFiltered = this._typeProducts.filter(p => p.typeProductId == code)[0];
       console.log(this.dataStorageFiltered);
       this.initForm('edit');
 }
}

