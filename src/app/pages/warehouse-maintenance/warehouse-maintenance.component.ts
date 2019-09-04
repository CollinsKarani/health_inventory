import { WarehouseMaintenanceService } from './../../services/warehouse-maintenance.service';
import { WarehouseMaintenance } from './../../models/warehouse-maintenance';
import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-warehouse-maintenance',
  templateUrl: './warehouse-maintenance.component.html',
  styleUrls: ['./warehouse-maintenance.component.scss'],
  providers: [NotificationsComponent]
})
export class WarehouseMaintenanceComponent implements OnInit {
  public openWindowOf: string;
  public isActive: string;
  public _storage: Array<WarehouseMaintenance>;
  private _newStorage: WarehouseMaintenance;
  private _idStorage: number;
  private _updateStorage: WarehouseMaintenance;

 // Trabajando con tablas
 public dataSource: any = [];
 displayedColumns: string[] = ['select', 'options', 'storageDescription', 'storageUbication'];
 public selection = new SelectionModel<WarehouseMaintenance>(true, []);

 //DECLARANDO E INICIALIZNDO OBJETO FILTERPROVIDER
 private dataStorageFiltered: WarehouseMaintenance;


 private status: boolean = false;
 storageForm: FormGroup;

  constructor(private _notification: NotificationsComponent, private _storageService: WarehouseMaintenanceService) {
   this.initFilteredProvider();
   this.initForm('');

 }


 ngOnInit() {
 this.getStorage();
 console.log('this._brand ngOnInit', this._storage); 
 }

 initForm( typeRequest: string): void {
   // Variables temp. ||
   let storageDescription = typeRequest == 'edit' ? this.dataStorageFiltered.storageDescription : '';
   let storageUbication = typeRequest == 'edit' ? this.dataStorageFiltered.storageUbication : '';
   
   // Instanciando Formulario Reactivo
   this.storageForm = new FormGroup({
    storageDescription: new FormControl(storageDescription, Validators.required),
    storageUbication: new FormControl(storageUbication, Validators.required),

   });
 }

 initFilteredProvider() {
   this.dataStorageFiltered = {
    storageId: 0,
    storageDescription: '',
    storageUbication: '',
   }
 }

 getStorage(): void {
       this._storageService.getStorage()
     .subscribe((data: WarehouseMaintenance[]) => {
       console.log('Warehouse SERVICE', data);
       this.dataSource = new MatTableDataSource<WarehouseMaintenance>(data);
       return this._storage = data;
   });
 }


 createUser(): void{ 
   this.initForm('');
   this._newStorage = new WarehouseMaintenance;
 }

 onCreateStorage(): void {
   this._newStorage = this.storageForm.value;
   console.log('Imprimiendo DATA del FORM', this._newStorage);
   this._storageService.createStorage(this._newStorage)
     .subscribe((data: WarehouseMaintenance ) => {
       console.log('Suceess WareHouse');
       this.openTypeWindow('', '');
       this._notification.notificationOpen('success', 'success!', 'WareHouse creado con exito');
       this.getStorage();
     }, error => console.log('error ' + error));
 }

 onEditStorage(): void{
   this._updateStorage = this.storageForm.value;
   console.log('Print data form by UpdateWarehouse', this._updateStorage);
   this._storageService.updateStorage(this._idStorage, this._updateStorage)
     .subscribe((data: WarehouseMaintenance ) => {
       console.log('Success Update Warehouse');
       this.openTypeWindow('', '');
       this._notification.notificationOpen('success', 'success!', 'Warehouse Modificado con exito');
       this.getStorage();
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
   this._notification.notificationOpen('success', 'success!', 'La bodega se ha almacenado con exito');
 }

 editItem(){
   this.openTypeWindow('', '');
   this._notification.notificationOpen('success', 'success!', 'La bodega se ha editado con exito');
 }

 onSubmit() {
   // TODO: Use EventEmitter with form value
   console.warn(this.storageForm.value);
 }

 addDataInputForm(code) {
       console.log(code);
       this._idStorage = code;
       this.dataStorageFiltered = this._storage.filter(p => p.storageId == code)[0];
       console.log(this.dataStorageFiltered);
       this.initForm('edit');
 }
}

