import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product, _Storage } from 'src/app/models/product';
import { Requisition } from 'src/app/models/requisition';
import { RequisitionService } from 'src/app/services/requisition.service';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';

import * as moment from 'moment'; 

//  MIGRACION
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition-form.component.html',
  styleUrls: ['./requisition-form.component.scss'],
  providers: [NotificationsComponent]
})
export class RequisitionFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  requisitionFormGroup: FormGroup;
  Contador: number;
  requisitionArr: [];
  hiddenTabled: boolean = false;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  _product:Array<Product>;
  _storage: _Storage[];
  _requisition: Array<Requisition>;
  _newRequisition: Requisition;

  public openWindowOf: string = "data";
  private __idProduct: number;
  // MIGRACION 
  public isActive: string;

  private __idRequisition: number;
  
  private _updateRequisition: Requisition;

  // Trabajando con tablas
  public dataSource:any = [];
  displayedColumns: string[] = ['select', 'options', 'requisitionId', 'class', 'reqPracticeName', 'section', 'storageId', 'classHour', 'practiceDate', 'requistionDate', 'statusRequisitionDate', 'requisitionStatusId'];
  public selection = new SelectionModel<Requisition>(true, []);

  //DECLARANDO E INICIALIZNDO OBJETO FILTERPROVIDER
  private dataRequisitionFiltered:Requisition;


  private status: boolean = false;
  requisitionForm:FormGroup;

  constructor(
    private _notification:NotificationsComponent,
    private _formBuilder: FormBuilder, 
    private _productService:ProductService, 
    private _requisitionService: RequisitionService
  ) {}

  ngOnInit() {
       this.initDataFormRequisition(''); 
       this.initForm();
       this.getProducts();
       this.getStorage();
       this.getRequisition();
  }

  generateDateNow(): string{
    // GENERAR FECHA AUTOMATICA
    let d = new Date();
    let date = d.getFullYear() + "-" + (d.getMonth() +1) + "-" + d.getDate();
    return date;
  }

  initDataFormRequisition (typeRequest:string) {
    // GENERAR FECHA AUTOMATICA
    let date =   this.generateDateNow();

    let idRequisition: number = this._requisition ? this._requisition.length + 1: 0;

    // Variables temp. || 
    let requisitionId = typeRequest == "edit" || typeRequest == "view" ? this.dataRequisitionFiltered.requisitionId: idRequisition;
    let requistionDate = typeRequest == "edit"  || typeRequest == "view" ? this.parsedDateTime(this.dataRequisitionFiltered.requistionDate, 'date') : date;
    let _class =  typeRequest == "edit"  || typeRequest == "view" ? this.dataRequisitionFiltered.class: '';
    let reqPracticeName =  typeRequest == "edit"  || typeRequest == "view" ? this.dataRequisitionFiltered.reqPracticeName: '';
    let section = typeRequest == "edit"  || typeRequest == "view" ?  this.dataRequisitionFiltered.section: '';
    let storageId =  typeRequest == "edit"  || typeRequest == "view"  ? this.dataRequisitionFiltered.storageId: '';
    let classHour = typeRequest == "edit"  || typeRequest == "view"  ? this.parsedDateTime(this.dataRequisitionFiltered.classHour, 'time'): '';
    let practiceDate = typeRequest == "edit"  || typeRequest == "view" ? this.dataRequisitionFiltered.practiceDate: '';
    
    console.log(typeRequest == "edit" ? this.dataRequisitionFiltered.requisitionDetails:'')
    

    this.requisitionFormGroup = this._formBuilder.group({
      requisitionId: [requisitionId, Validators.required],
      requistionDate: [requistionDate, Validators.required],
      class: [_class, Validators.required],
      reqPracticeName: [reqPracticeName, Validators.required],
      section: [section, Validators.required],
      storageId: [storageId, Validators.required],      
      classHour: [classHour, Validators.required],
      practiceDate: [practiceDate, Validators.required],
      requisitionDetails: this._formBuilder.array([ this.addproductFormGroup(typeRequest)])  
    });
  }

  parsedDateTime(dateToParsed:any, typeParsed:string) : string {
    let data =  new Date(dateToParsed);
    let  dateParsed;
    if (typeParsed == 'date'){
      dateParsed = data.getFullYear() + "-" + (data.getMonth() +1) + "-" + data.getDate();
    } else if(typeParsed == 'time') {

      let hours = data.getHours();  
      let minutes = data.getMinutes();
      let strH:string;
      let strM:string;

      hours < 10 ?  strH = '0' + hours: strH = hours.toString();
      minutes < 10 ? strM = '0' + minutes: strM = minutes.toString();
      dateParsed = strH + ":" + strM;
      //console.log(dateParsed)
    }
    return dateParsed;
  }

  addproductFormGroup(typeRequest:string): FormGroup { 
    let data: any;
    if(typeRequest =='edit' || typeRequest == "view"  ){
      this.dataRequisitionFiltered.requisitionDetails.forEach(element => {
        let quantity =  element.quantity;
        let productId =  element.productId;
        let observation =  element.observation;
        data = this._formBuilder.group({  
          Quantity: [quantity, Validators.required],
          ProductId: [productId, Validators.required],
          observation: [observation, Validators.required]  
        });  
      }); 
    } else {
      data =  this._formBuilder.group({  
        Quantity: ['', Validators.required],
        ProductId: ['', Validators.required],
        observation: ['', Validators.required]
      });  
     }

    return  data;
  } 

  // AGREGAR NUEVA LINEA PARA LA LISTA DE PRODUCTOS
  addNewLineProduct(): void {  
    (<FormArray>this.requisitionFormGroup.get('requisitionDetails')).push(this.addproductFormGroup(''));  
  }  

  // OBTENER TODOS LOS PRODUCTOS
  getProducts() {
    this._productService.getProducts()
      .subscribe((data : Product[]) => {
          console.log('PRODUCT SERVICE', data);
          return this._product = data;
      });
  }

  // OBTENER TODAS LAS BODEGAS
  getStorage(){
    return this._productService.getStorages()
    .subscribe((data : _Storage[]) => {
      console.log('Storages SERVICE', data);
      return this._storage = data;
    });
  }
 // PREPARAR LA NUEVA REQUISICION
  createRequisition():void{ 
    this._newRequisition = new Requisition;
  }

 // CREAR LA REQUISICION
  onCreateRequisition() : void{
    this._newRequisition = this.requisitionFormGroup.value;
    console.log("Imprimiendo DATA del FORM", this._newRequisition);
    this._requisitionService.createRequisition(this._newRequisition)
      .subscribe((data : Requisition ) =>{
        console.log('Suucess Create Requisition');
        this.openTypeWindow('', '');
        this._notification.notificationOpen('success', 'success!', 'Requisicion se enviado con exito!!!');
        this.getRequisition();
      }, error => console.log("Upps => "+ error));
  }

  saveData(): void {
    var data:any = this.requisitionFormGroup.value;
    console.log(data)
  }

  // MIGRACION
  
  getRequisition(): void {
    this._requisitionService.getRequisition()
    .subscribe((data: Requisition[]) => {
      console.log('REQUISITION SERVICE', data);
      this.dataSource = new MatTableDataSource<Requisition>(data);
      return this._requisition = data;
    });
  }

  /** Si el número de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
  }

  /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, la selección se limpia. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  initForm(): void {

    // Instanciando Formulario Reactivo
    this.requisitionForm = new FormGroup({
      requisitionId: new FormControl('', Validators.required),
      class: new FormControl('', Validators.required),
      section: new FormControl('', Validators.required),
      practiceDate: new FormControl('', Validators.required),
    });

  }

  openTypeWindow (type: string, code:string): void {
    this.openWindowOf = type;
    // this.openWindowOf == "edit" || "create" || "view" ? this.hiddenTabled = true : this.hiddenTabled = false;
    if (this.openWindowOf == "edit" || this.openWindowOf == "create" || this.openWindowOf == "view") {
      this.hiddenTabled = true
    } else {
      this.hiddenTabled = false;
    }
    console.log(this.hiddenTabled)
    let btnAdd = document.getElementById('add');
    let btnfilter = document.getElementById('filter');
    let inputCode = document.getElementById('class');


    if (type=='create'){
      btnAdd.classList.add('active');
      btnfilter.classList.remove('active');
      this.initDataFormRequisition('');
    }else if (type=='filter'){
      btnAdd.classList.remove('active');
      btnfilter.classList.add('active');  
    }else if (type=='edit' || type == "view" ){
      this.addDataInputForm(code);
      inputCode ? inputCode.focus() : null;
    }else{
      btnAdd.classList.remove('active');
      btnfilter.classList.remove('active');
    }

  }

  addDataInputForm(code) {
      console.log(code);
      this.__idRequisition = code;
      this.dataRequisitionFiltered = this._requisition.filter(r => r.requisitionId == code)[0];
      console.log(this.dataRequisitionFiltered);
      this.initDataFormRequisition('edit');
  }


  filteredProduct(code):string{
    console.log(code);
    this.__idProduct = code;
    return this._product.filter(p => p.productId == code)[0].productName;
  }

  private containerTimeVerification:any = {
    requisitionTime: '',
    practiceDate: ''
  };
  statusRequisitionMessage: string;
  verificationRequisitionTime(requisitionTime: any, practiceDate: any) {
    try{
      this.containerTimeVerification = {
        requisitionTime: requisitionTime!= '' ? requisitionTime.target.value :  this.containerTimeVerification.requisitionTime,
        practiceDate: practiceDate !='' ? practiceDate.target.value : this.containerTimeVerification.practiceDate
      }

      if (this.containerTimeVerification.requisitionTime.length > 0 && this.containerTimeVerification.practiceDate!='') {
        let dNow = new Date();
        console.log(dNow)
        let dateNow = this.parsedDateTime(dNow, 'date'); 
        let TimeNow = this.parsedDateTime(dNow, 'time'); 
        let dateTimeNow = dateNow + " " + TimeNow + ':00';

        let practiceDate = this.parsedDateTime(this.containerTimeVerification.practiceDate, 'date');
        let requisitionTime = this.containerTimeVerification.requisitionTime + ':00';
        
        let practiceDateTime  = practiceDate + " " + requisitionTime;
        
        console.log("dateTimeNow", dateTimeNow);
        console.log("practiceDateTime",practiceDateTime);
        var dNowRequisition = moment(dateTimeNow, "YYYY-MM-DD HH:mm:ss");
        var dPracticeRequisition = moment(practiceDateTime, "YYYY-MM-DD HH:mm:ss");

        var diffDaysPractice = dPracticeRequisition.diff(dNowRequisition, 'd'); // Diff in days
        console.log("Dias",diffDaysPractice);

        var diffHoursPractice = dPracticeRequisition.diff(dNowRequisition, 'h'); // Diff in hours
        console.log("Horas",diffHoursPractice);
debugger
        if (diffHoursPractice > 72) {

          console.log("Alert Green");
          this.statusRequisitionMessage = "";
          this.deleteClass();
          document.getElementById('statusRequisitionDate').classList.add("status-requisition-date-success");

        } else if (diffHoursPractice > 48) {    
          this.deleteClass();
          this.statusRequisitionMessage = "El tiempo de solicitud esta por debajo de las 72 hrs. ";
          document.getElementById('statusRequisitionDate').classList.add("status-requisition-date-warning");
          console.log("Alert Yellow");

        } else if (diffHoursPractice < 48) {
          this.deleteClass();
          console.log("Alert Red");
          this.statusRequisitionMessage = "Imposible registrar esta solicitud, se requieren 72 horas de anticipación";
          document.getElementById('statusRequisitionDate').classList.add("status-requisition-date-danger");
        }
        debugger
        console.log("dateNow",dateNow, "practiceDate", practiceDate, "requisitionTime", requisitionTime);
      }
    } catch (e) {
      console.log("Ocurrio un error inesperado, Contacte con el administrador")
    }
  }

  deleteClass() {
    let tagName: string = "statusRequisitionDate";
    let theClass:string = "status-requisition-date-";
    var tag = document.getElementById(tagName);
    let arrayClass = ["success", "warning", "danger"]
    if(tag) {
      for(let i=0; i < arrayClass.length; i++){
        if (tag.classList.contains(theClass + arrayClass[i])) {
          tag.classList.remove(theClass + arrayClass[i]);
        }
      }
    }
  } 

  saveDataSelect(data) {
      debugger
      console.log("data",data)
      console.log("this.dataRequisitionFiltered.requisitionDetails",this.dataRequisitionFiltered.requisitionDetails)
  }

  onEditRequisition(){
    let data = this.requisitionFormGroup.value;
    console.log("onEditRequisition", data)
 }
}


