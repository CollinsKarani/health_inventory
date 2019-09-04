import { BrandMaintenanceService } from './../../services/brand-maintenance.service';
import { BrandMaintenance } from './../../models/brand-maintenance';
import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-brand-maintenance',
  templateUrl: './brand-maintenance.component.html',
  styleUrls: ['./brand-maintenance.component.scss'],
  providers: [NotificationsComponent]
})
export class BrandMaintenanceComponent implements OnInit {
  public openWindowOf: string;
  public isActive: string;
  public _brand: Array<BrandMaintenance>;
  private _newBrand: BrandMaintenance;
  private _idBrand: number;
  private _updateBrand: BrandMaintenance;

 // Trabajando con tablas
 public dataSource: any = [];
 displayedColumns: string[] = ['select', 'options', 'productBrandName'];
 public selection = new SelectionModel<BrandMaintenance>(true, []);

 //DECLARANDO E INICIALIZNDO OBJETO FILTERPROVIDER
 private dataBrandFiltered: BrandMaintenance;


 private status: boolean = false;
 brandForm: FormGroup;

  constructor(private _notification: NotificationsComponent, private _brandService: BrandMaintenanceService) {
   this.initFilteredProvider();
   this.initForm('');

 }


 ngOnInit() {
 this.getBrand();
 console.log('this._brand ngOnInit', this._brand); 
 }

 initForm( typeRequest: string): void {
   // Variables temp. ||
   let productBrandName = typeRequest == 'edit' ? this.dataBrandFiltered.productBrandName : '';
   
   // Instanciando Formulario Reactivo
   this.brandForm = new FormGroup({
    productBrandName: new FormControl(productBrandName, Validators.required),

   });
 }

 initFilteredProvider() {
   this.dataBrandFiltered = {
    productBrandId: 0,
    productBrandName: '',
   }
 }

 getBrand(): void {
       this._brandService.getBrand()
     .subscribe((data: BrandMaintenance[]) => {
       console.log('Brand SERVICE', data);
       this.dataSource = new MatTableDataSource<BrandMaintenance>(data);
       return this._brand = data;
   });
 }


 createUser(): void{ 
   this.initForm('');
   this._newBrand = new BrandMaintenance;
 }

 onCreateBrand(): void {
   this._newBrand = this.brandForm.value;
   console.log('Imprimiendo DATA del FORM', this._newBrand);
   this._brandService.createBrand(this._newBrand)
     .subscribe((data: BrandMaintenance ) => {
       console.log('Suceess Brand');
       this.openTypeWindow('', '');
       this._notification.notificationOpen('success', 'success!', 'Brand creado con exito');
       this.getBrand();
     }, error => console.log('error ' + error));
 }

 onEditBrand(): void{
   this._updateBrand = this.brandForm.value;
   console.log('Print data form by UpdateBrand', this._updateBrand);
   this._brandService.updateBrand(this._idBrand, this._updateBrand)
     .subscribe((data: BrandMaintenance ) => {
       console.log('Success Update Brand');
       this.openTypeWindow('', '');
       this._notification.notificationOpen('success', 'success!', 'Brand Modificado con exito');
       this.getBrand();
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
   this._notification.notificationOpen('success', 'success!', 'La marca se ha almacenado con exito');
 }

 editItem(){
   this.openTypeWindow('', '');
   this._notification.notificationOpen('success', 'success!', 'La marca se ha editado con exito');
 }

 onSubmit() {
   // TODO: Use EventEmitter with form value
   console.warn(this.brandForm.value);
 }

 addDataInputForm(code) {
       console.log(code);
       this._idBrand = code;
       this.dataBrandFiltered = this._brand.filter(p => p.productBrandId == code)[0];
       console.log(this.dataBrandFiltered);
       this.initForm('edit');
 }
}
