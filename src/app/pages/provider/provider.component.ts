import { ProviderService } from './../../services/provider.service';
import { Provider, Cities } from './../../models/provider';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';
import { MatTableDataSource } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
  providers: [NotificationsComponent]

})

export class ProviderComponent implements OnInit {
  closeResult: string;
  public openWindowOf: string;
  public isActive: string;

  public _provider: Array<Provider>;
  public _cities: Array<Cities>;
  private _newProvider: Provider;

  private __idProvider: number;



  private _updateProvider: Provider;

  // Trabajando con tablas
  public dataSource: any = [];
  displayedColumns: string[] = [
    'select', 'options', 'name',
    'RTN', 'email', 'address', 'phone1', 'phone2',
    'contact', 'city', 'contactPosition'];
  public selection = new SelectionModel<Provider>(true, []);

  // DECLARANDO E INICIALIZNDO OBJETO FILTERPROVIDER
  private dataProviderFiltered: Provider;


  providerForm: FormGroup;

  constructor(private _notification: NotificationsComponent, private _providerService: ProviderService, private modalService: NgbModal) {
    this.initFilteredProvider();
    this.initForm('');

  }


  ngOnInit() {
    this.getProvider();
    this.getCities();
    console.log('this._brand ngOnInit', this._provider);
  }

  initForm(typeRequest: string): void {
    // Variables temp. ||
    let name = typeRequest == 'edit' ? this.dataProviderFiltered.providerName : '';
    let RTN = typeRequest == 'edit' ? this.dataProviderFiltered.providerRtn : '';
    let phone1 = typeRequest == 'edit' ? this.dataProviderFiltered.providerPhone1 : '';
    let phone2 = typeRequest == 'edit' ? this.dataProviderFiltered.providerPhone2 : '';
    let address = typeRequest == 'edit' ? this.dataProviderFiltered.providerAddress : '';
    let email = typeRequest == 'edit' ? this.dataProviderFiltered.providerEmail : '';
    let contact = typeRequest == 'edit' ? this.dataProviderFiltered.providerContact : '';
    let cityId = typeRequest == 'edit' ? this.dataProviderFiltered.city.cityId : '';
    let contactPosition = typeRequest == 'edit' ? this.dataProviderFiltered.contactPosition : '';



    // Instanciando Formulario Reactivo
    this.providerForm = new FormGroup({
      providerName: new FormControl(name, Validators.required),
      providerRtn: new FormControl(RTN, Validators.required),
      providerPhone1: new FormControl(phone1, Validators.required),
      providerPhone2: new FormControl(phone2, Validators.required),
      providerAddress: new FormControl(address, Validators.required),
      providerEmail: new FormControl(email, Validators.required),
      providerContact: new FormControl(contact, Validators.required),
      contactPosition: new FormControl(contactPosition, Validators.required),
      cityId: new FormControl(cityId, Validators.required)
    });
  }

  initFilteredProvider() {
    this.dataProviderFiltered = {
      providersId: 0,
      providerName: '',
      providerRtn: '',
      providerPhone1: '',
      providerPhone2: '',
      providerAddress: '',
      providerEmail: '',
      providerContact: '',
      contactPosition: '',
      city: new Cities,
    };
  }

  getProvider(): void {
    this._providerService.getProvider()
      .subscribe((data: Provider[]) => {
        console.log('PROVIDER SERVICE', data);
        this.dataSource = new MatTableDataSource<Provider>(data);
        return this._provider = data;
      });
  }

  getCities(): void {
    this._providerService.getCities()
      .subscribe((data: Cities[]) => {
        console.log('Cities SERVICE', data);
        // this.dataSource = new MatTableDataSource<Cities>(data);
        return this._cities = data;
      });
  }

  createUser(): void {
    this.initForm('');
    this._newProvider = new Provider;
  }

  onCreateProvider(): void {
    this._newProvider = this.providerForm.value;
    console.log('Imprimiendo DATA del FORM', this._newProvider);
    this._providerService.createProvider(this._newProvider)
      .subscribe((data: Provider) => {
        console.log('Suceess Create Provider');
        this.openTypeWindow('', '');
        this._notification.notificationOpen('success', 'success!', 'Proveedor creado con exito');
        this.getProvider();
      }, error => console.log('error ' + error));
  }

  onEditProvider(): void {
    this._updateProvider = this.providerForm.value;
    console.log('Print data form by UpdateProvider', this._updateProvider);
    this._providerService.updateProvider(this.__idProvider, this._updateProvider)
      .subscribe((data: Provider) => {
        console.log('Success Update Provider');
        this.openTypeWindow('', '');
        this._notification.notificationOpen('success', 'success!', 'Proveedor Modificado con exito');
        this.getProvider();
      }, error => console.log('Upps => ' + error));
  }

  onDeleteProvider(code: number): void {
    this.__idProvider = code;
    this._providerService.deleteProvider(this.__idProvider)
      .subscribe((data: Provider) => {
        console.log('Success Delete Provider');
        this.openTypeWindow('', '');
        this.modalService.dismissAll();
        this._notification.notificationOpen('success', 'success!', 'Proveedor ha sido eliminado con exito!!!');
        this.getProvider();
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



  openTypeWindow(type: string, code: string): void {
    this.openWindowOf = type;
    let btnAdd = document.getElementById('add');
    let btnfilter = document.getElementById('filter');
    let inputCode = document.getElementById('providerName');

    if (type == 'create') {
      btnAdd.classList.add('active');
      btnfilter.classList.remove('active');
      this.createUser();
    } else if (type == 'filter') {
      btnAdd.classList.remove('active');
      btnfilter.classList.add('active');
    } else if (type == 'edit') {
      this.addDataInputForm(code);
      inputCode ? inputCode.focus() : null;
    } else {
      btnAdd.classList.remove('active');
      btnfilter.classList.remove('active');
    }

  }

  saveItem() {
    this.openTypeWindow('', '');
    this._notification.notificationOpen('success', 'success!', 'El proveedor se ha almacenado con exito');
  }

  editItem() {
    this.openTypeWindow('', '');
    this._notification.notificationOpen('success', 'success!', 'El proveedor se ha editado con exito');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.providerForm.value);
  }

  addDataInputForm(code) {
    console.log(code);
    this.__idProvider = code;
    this.dataProviderFiltered = this._provider.filter(p => p.providersId == code)[0];
    console.log(this.dataProviderFiltered);
    this.initForm('edit');
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}