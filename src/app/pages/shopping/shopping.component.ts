import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
// import { ProductService } from 'src/app/services/product.service';
// import { Product, _Storage } from 'src/app/models/product';
//import { Shopping } from 'src/app/models/shopping';
// import { ShoppingService } from 'src/app/services/shopping.service';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';

// import * as moment from 'moment'; 

//  MIGRACION
// import { SelectionModel } from '@angular/cdk/collections';
// import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  providers: [NotificationsComponent]
})
export class ShoppingComponent {

  
  // isLinear = false;
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // shoppingFormGroup: FormGroup;
  // Contador: number;
  // shoppingArr: [];
  // hiddenTabled: boolean = false;

  // date = new FormControl(new Date());
  // serializedDate = new FormControl((new Date()).toISOString());

  // _product:Array<Product>;
  // _storage: _Storage[];
  // _shopping: Array<Shopping>;
  // _newShopping: Shopping;

  // public openWindowOf: string = "data";
  // private __idProduct: number;
  // // MIGRACION 
  // public isActive: string;

  // private __idShopping: number;
  
  // private _updateShopping: Shopping;

  // // Trabajando con tablas
  // public dataSource:any = [];
  // displayedColumns: string[] = ['select', 'options', 'purchaseId', 'purchaseDate', 'productId', 'quantity', 'unitCost', 'totalCost'];
  // public selection = new SelectionModel<Shopping>(true, []);

  // //DECLARANDO E INICIALIZNDO OBJETO FILTERPROVIDER
  // private dataShoppingFiltered:Shopping;


  // private status: boolean = false;
  // shoppingForm:FormGroup;

  constructor(
    // private _notification:NotificationsComponent,
    // private _formBuilder: FormBuilder, 
    // private _productService:ProductService, 
    // private _shoppingService: ShoppingService
  ) {}

//   ngOnInit() {
//        this.initDataFormRequisition(''); 
//        this.initForm();
//        this.getProducts();
//        this.getStorage();
//        this.getRequisition();
//   }

//   generateDateNow(): string{
//     // GENERAR FECHA AUTOMATICA
//     let d = new Date();
//     let date = d.getFullYear() + "-" + (d.getMonth() +1) + "-" + d.getDate();
//     return date;
//   }

//   initDataFormRequisition (typeRequest:string) {
//     // GENERAR FECHA AUTOMATICA
//     let date =   this.generateDateNow();

//     let purchaseIds: number = this._shopping ? this._shopping.length + 1: 0;

//     // Variables temp. || 
//     let purchaseId = typeRequest == "edit" || typeRequest == "view" ? this.dataShoppingFiltered.purchaseId: purchaseIds;
//     let purchaseDate = typeRequest == "edit"  || typeRequest == "view" ? this.parsedDateTime(this.dataShoppingFiltered.purchaseDate, 'date') : date;
//     let productId =  typeRequest == "edit"  || typeRequest == "view" ? this.dataShoppingFiltered.purchaseDetails.productId: '';
//     let quantity =  typeRequest == "edit"  || typeRequest == "view" ? this.dataShoppingFiltered.purchaseDetails.quantity: '';
//     let unitCost =  typeRequest == "edit"  || typeRequest == "view"  ? this.dataShoppingFiltered.purchaseDetails.unitCost: '';
//     let totalCost = typeRequest == "edit"  || typeRequest == "view"  ? this.parsedDateTime(this.dataShoppingFiltered.purchaseDetails.totalCost, 'time'): '';
    
//     console.log(typeRequest == "edit" ? this.dataShoppingFiltered.purchaseDetails:'')
    

//     this.shoppingFormGroup = this._formBuilder.group({
//       purchaseId: [purchaseId, Validators.required],
//       purchaseDate: [purchaseDate, Validators.required],
//       purchaseDetails: this._formBuilder.array([ this.addproductFormGroup(typeRequest)])  
//     });
//   }

//   parsedDateTime(dateToParsed:any, typeParsed:string) : string {
//     let data =  new Date(dateToParsed);
//     let  dateParsed;
//     if (typeParsed == 'date'){
//       dateParsed = data.getFullYear() + "-" + (data.getMonth() +1) + "-" + data.getDate();
//     } else if(typeParsed == 'time') {

//       let hours = data.getHours();  
//       let minutes = data.getMinutes();
//       let strH:string;
//       let strM:string;

//       hours < 10 ?  strH = '0' + hours: strH = hours.toString();
//       minutes < 10 ? strM = '0' + minutes: strM = minutes.toString();
//       dateParsed = strH + ":" + strM;
//       //console.log(dateParsed)
//     }
//     return dateParsed;
//   }

//   addproductFormGroup(typeRequest:string): FormGroup { 
//     let data: any;
//     if(typeRequest =='edit' || typeRequest == "view"  ){
//       this.dataShoppingFiltered.purchaseDetails.forEach(element => {
//         let quantity =  element.quantity;
//         let productId =  element.productId;
//         let observation =  element.observation;
//         data = this._formBuilder.group({  
//           Quantity: [quantity, Validators.required],
//           ProductId: [productId, Validators.required],
//           observation: [observation, Validators.required]  
//         });  
//       }); 
//     } else {
//       data =  this._formBuilder.group({  
//         purchaseDetailId: ['', Validators.required],
//         purchaseId: ['', Validators.required],
//         quantity: ['', Validators.required],
//         unitCost: ['', Validators.required],
//         totalCost: ['', Validators.required],
//       });  
//      }

//     return  data;
//   } 

//   // AGREGAR NUEVA LINEA PARA LA LISTA DE PRODUCTOS
//   addNewLineProduct(): void {  
//     (<FormArray>this.shoppingFormGroup.get('requisitionDetails')).push(this.addproductFormGroup(''));  
//   }  

//   // OBTENER TODOS LOS PRODUCTOS
//   getProducts() {
//     this._productService.getProducts()
//       .subscribe((data : Product[]) => {
//           console.log('PRODUCT SERVICE', data);
//           return this._product = data;
//       });
//   }

//   // OBTENER TODAS LAS BODEGAS
//   getStorage(){
//     return this._productService.getStorages()
//     .subscribe((data : _Storage[]) => {
//       console.log('Storages SERVICE', data);
//       return this._storage = data;
//     });
//   }
//  // PREPARAR LA NUEVA REQUISICION
//   createRequisition():void{ 
//     this._newShopping = new Shopping;
//   }

//  // CREAR LA REQUISICION
//   onCreateRequisition() : void{
//     this._newShopping = this.requisitionFormGroup.value;
//     console.log("Imprimiendo DATA del FORM", this._newShopping);
//     this._shoppingService.createRequisition(this._newShopping)
//       .subscribe((data : Shopping ) =>{
//         console.log('Suucess Create Requisition');
//         this.openTypeWindow('', '');
//         this._notification.notificationOpen('success', 'success!', 'Requisicion se enviado con exito!!!');
//         this.getShopping();
//       }, error => console.log("Upps => "+ error));
//   }

//   saveData(): void {
//     var data:any = this.shoppingFormGroup.value;
//     console.log(data)
//   }

//   // MIGRACION
  
//   getRequisition(): void {
//     this._shoppingService.getRequisition()
//     .subscribe((data: Shopping[]) => {
//       console.log('REQUISITION SERVICE', data);
//       this.dataSource = new MatTableDataSource<Shopping>(data);
//       return this._shopping = data;
//     });
//   }

//   /** Si el número de elementos seleccionados coincide con el número total de filas. */
//   isAllSelected() {
//   const numSelected = this.selection.selected.length;
//   const numRows = this.dataSource.data.length;
//   return numSelected === numRows;
//   }

//   /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, la selección se limpia. */
//   masterToggle() {
//     this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
//   }

//   initForm(): void {

//     // Instanciando Formulario Reactivo
//     this.shoppingForm = new FormGroup({
//       shoppingId: new FormControl('', Validators.required),
//       class: new FormControl('', Validators.required),
//       section: new FormControl('', Validators.required),
//       practiceDate: new FormControl('', Validators.required),
//     });

//   }

//   openTypeWindow (type: string, code:string): void {
//     this.openWindowOf = type;
//     // this.openWindowOf == "edit" || "create" || "view" ? this.hiddenTabled = true : this.hiddenTabled = false;
//     if (this.openWindowOf == "edit" || this.openWindowOf == "create" || this.openWindowOf == "view") {
//       this.hiddenTabled = true
//     } else {
//       this.hiddenTabled = false;
//     }
//     console.log(this.hiddenTabled)
//     let btnAdd = document.getElementById('add');
//     let btnfilter = document.getElementById('filter');
//     let inputCode = document.getElementById('class');


//     if (type=='create'){
//       btnAdd.classList.add('active');
//       btnfilter.classList.remove('active');
//       this.initDataFormRequisition('');
//     }else if (type=='filter'){
//       btnAdd.classList.remove('active');
//       btnfilter.classList.add('active');  
//     }else if (type=='edit' || type == "view" ){
//       this.addDataInputForm(code);
//       inputCode ? inputCode.focus() : null;
//     }else{
//       btnAdd.classList.remove('active');
//       btnfilter.classList.remove('active');
//     }

//   }

//   addDataInputForm(code) {
//       console.log(code);
//       this.__idShopping = code;
//       this.dataShoppingFiltered = this._shopping.filter(r => r.shoppingId == code)[0];
//       console.log(this.dataShoppingFiltered);
//       this.initDataFormShopping('edit');
//   }


//   filteredProduct(code):string{
//     console.log(code);
//     this.__idProduct = code;
//     return this._product.filter(p => p.productId == code)[0].productName;
//   }

//   private containerTimeVerification:any = {
//     shoppingTime: '',
//     practiceDate: ''
//   };
//   statusShoppingMessage: string;
//   verificationShoppingTime(shoppingTime: any, practiceDate: any) {
//     this.containerTimeVerification = {
//       shoppingTime: shoppingTime!= '' ? shoppingTime.target.value :  this.containerTimeVerification.shoppingTime,
//       practiceDate: practiceDate !='' ? practiceDate.target.value : this.containerTimeVerification.practiceDate
//     }

//     if (this.containerTimeVerification.shoppingTime.length > 0 && this.containerTimeVerification.practiceDate!='') {
//       let dNow = new Date();
//       console.log(dNow)
//       let dateNow = this.parsedDateTime(dNow, 'date'); 
//       let TimeNow = this.parsedDateTime(dNow, 'time'); 
//       let dateTimeNow = dateNow + " " + TimeNow + ':00';

//       let practiceDate = this.parsedDateTime(this.containerTimeVerification.practiceDate, 'date');
//       let shoppingTime = this.containerTimeVerification.shoppingTime + ':00';
      
//       let practiceDateTime  = practiceDate + " " + shoppingTime;
      
//       console.log("dateTimeNow", dateTimeNow);
//       console.log("practiceDateTime",practiceDateTime);
//       var dNowRequisition = moment(dateTimeNow, "YYYY-MM-DD HH:mm:ss");
//       var dPracticeRequisition = moment(practiceDateTime, "YYYY-MM-DD HH:mm:ss");

//       var diffDaysPractice = dPracticeRequisition.diff(dNowRequisition, 'd'); // Diff in days
//       console.log("Dias",diffDaysPractice);

//       var diffHoursPractice = dPracticeRequisition.diff(dNowRequisition, 'h'); // Diff in hours
//       console.log("Horas",diffHoursPractice);
      
//       if (diffHoursPractice > 72) {
//        console.log("Alert Green");
//        this.statusShoppingMessage = "";
//       } else if (diffHoursPractice > 48) {
//         this.statusShoppingMessage = "El tiempo de solicitud esta por debajo de las 72 hrs. ";
//        console.log("Alert Yellow") 
//       } else if (diffHoursPractice < 48) {
//        console.log("Alert Red")
//        this.statusShoppingMessage = "Imposible registrar esta solicitud, se requieren 72 horas de anticipación";
//       }
//       console.log("dateNow",dateNow, "practiceDate", practiceDate, "shoppingTime", shoppingTime);
//     }

//   }

//   saveDataSelect(data) {
//       debugger
//       console.log("data",data)
//       console.log("this.dataRequisitionFiltered.requisitionDetails",this.dataShoppingFiltered.shoppingDetails)
//   }

//   onEditRequisition(){
//     let data = this.shoppingFormGroup.value;
//     console.log("onEditRequisition", data)
//  }

}
