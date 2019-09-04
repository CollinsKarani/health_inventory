import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Product, Brand, TypeProduct, Providers, _Storage } from 'src/app/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith, debounceTime} from 'rxjs/operators';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';
import { ProductService } from 'src/app/services/product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NotificationsComponent]
})

export class ProductsComponent implements OnInit {
  closeResult: string;
  public openWindowOf: string;
  public isActive: string;
  public _product: Array<Product>;

  private __idProduct: number;

  private _newProduct: Product;
  private _updateProduct: Product;

  // Trabajando con tablas
  public dataSource: any = [];
  displayedColumns: string[] = ['select', 'options', 'code', 'name', 'quantity', 'cost', 'brand', 'type', 'provider', 'storage'];
  public selection = new SelectionModel<Product>(true, []);

  // DECLARANDO E INICIALIZNDO OBJETO FILTERPRODUCT
  private dataProductFiltered: Product;

  _brand: Brand[];
  _providers: Providers[];
  _typeProduct: TypeProduct[];
  _storage: _Storage[];

  private status = false;
  productForm: FormGroup;
  // this.dataProductFiltered.productName || ""

   constructor(private _notification: NotificationsComponent, private _productService: ProductService, private modalService: NgbModal) {
    this.initFilteredProduct();
    this.initForm('');

    console.log('BRANDS DATA', this._productService.getBrands());
  }


  ngOnInit() {
  this.getBrands();
  this.getProducts();
  this.getTypeProduct();
  this.getProviders();
  this.getStorage();
  console.log('this._brand ngOnInit', this._brand);
  }

  initForm( typeRequest: string): void {
    // Variables temp. ||
    const code = typeRequest == 'edit' ? this.dataProductFiltered.productCode : '';
    const name = typeRequest == 'edit' ? this.dataProductFiltered.productName : '';
    const brand = typeRequest == 'edit' ? this.dataProductFiltered.productBrand.productBrandId : '';
    const typeProduct =  typeRequest == 'edit' ? this.dataProductFiltered.typeProduct.typeProductId : '';
    const cost =  typeRequest == 'edit' ? this.dataProductFiltered.productCost : '';
    const provider = typeRequest == 'edit' ?  this.dataProductFiltered.providers.providersId : '';
    const storage =  typeRequest == 'edit' ? this.dataProductFiltered.storage.storageId : '';
    const quantity = typeRequest == 'edit' ? this.dataProductFiltered.quantity : '';

    // Instanciando Formulario Reactivo
    this.productForm = new FormGroup({
      productCode: new FormControl(code, Validators.required),
      productName: new FormControl(name, Validators.required),
      productBrandId: new FormControl(brand, Validators.required),
      typeProductId: new FormControl(typeProduct, Validators.required),
      productCost: new FormControl(cost, Validators.required),
      providersId: new FormControl(provider, Validators.required),
      storageId: new FormControl(storage, Validators.required),
      quantity: new FormControl (quantity, Validators.required )
    });
  }

  initFilteredProduct() {
    this.dataProductFiltered = {
      productId: 0,
      options: '',
      productCode: '',
      productName: '',
      productBrand: new Brand,
      typeProduct: new TypeProduct,
      productCost: 0,
      providers: new Providers,
      storage: new _Storage,
      quantity: 0
    };
  }

  getProducts() {
  this._productService.getProducts()
    .subscribe((data: Product[]) => {
        console.log('PRODUCT SERVICE', data);
        this.dataSource = new MatTableDataSource<Product>(data);
        return this._product = data;
    });
  }

  getBrands() {
    return this._productService.getBrands()
    .subscribe((data: Brand[]) => {
      console.log('BRAND SERVICE', data);
      return this._brand = data;
    });
  }

  getTypeProduct() {
    return this._productService.getTypeProduct()
    .subscribe((data: TypeProduct[]) => {
      console.log('ProductType SERVICE', data);
      return this._typeProduct = data;
    });
  }

  getProviders() {
    return this._productService.getProviders()
    .subscribe((data: Providers[]) => {
      console.log('Providers SERVICE', data);
      return this._providers = data;
    });
  }

  getStorage() {
    return this._productService.getStorages()
    .subscribe((data: _Storage[]) => {
      console.log('Storages SERVICE', data);
      return this._storage = data;
    });
  }

  createUser(): void {
    this.initForm('');
    this._newProduct = new Product;
  }

  onCreateProduct(): void {
    this._newProduct = this.productForm.value;
    console.log('Imprimiendo DATA del FORM', this._newProduct);
    this._productService.createProduct(this._newProduct)
      .subscribe((data: Product ) => {
        console.log('Suucess Create Product');
        this.openTypeWindow('', '');
        this._notification.notificationOpen('success', 'success!', 'Producto creado con exito');
        this.getProducts();
      }, error => console.log('Upps => '+ error));
  }

  onEditProduct(): void {
    this._updateProduct = this.productForm.value;
    console.log('Print data form by UpdateProduct', this._updateProduct);
    this._productService.updateProduct(this.__idProduct, this._updateProduct)
      .subscribe((data: Product ) => {
        console.log('Success Update Product');
        this.openTypeWindow('', '');
        this._notification.notificationOpen('success', 'success!', 'Producto Modificado con exito');
        this.getProducts();
      }, error => console.log('Upps => '+ error));
  }

  onDeleteProduct(code: number): void {
    this.__idProduct = code;
    this._productService.deleteProduct(this.__idProduct)
      .subscribe((data: Product ) => {
        console.log('Success Delete Product');
        this.openTypeWindow('', '');
        this.modalService.dismissAll();
        this._notification.notificationOpen('success', 'success!', 'Producto ha sido eliminado con exito!!!');
        this.getProducts();
      }, error => console.log('Upps => '+ error));
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
    const btnAdd = document.getElementById('add');
    const btnfilter = document.getElementById('filter');
    const inputCode = document.getElementById('productCode');

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
    this._notification.notificationOpen('success', 'success!', 'El producto se almacenado con exito');
  }

  editItem() {
    this.openTypeWindow('', '');
    this._notification.notificationOpen('success', 'success!', 'El producto se editado con exito');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.productForm.value);
  }

  addDataInputForm(code) {
        console.log(code);
        this.__idProduct = code;
        this.dataProductFiltered = this._product.filter(p => p.productId == code)[0];
        console.log(this.dataProductFiltered);
        this.initForm('edit');
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.dismissReason(reason)}`;
    });
  }

  dismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
