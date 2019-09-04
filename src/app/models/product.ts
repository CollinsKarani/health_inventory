export class Product {
    productId: number;
    options: string;
    productCode: string;
    productName: string;
    productBrand: Brand;
    typeProduct: TypeProduct;
    productCost: number;
    providers: Providers;
    storage: _Storage;
    quantity: number;
}

export class  Brand {
    productBrandId: number;
    productBrandName: string;
    product2s: string
}

export class Providers {
    product2s: number
    providerContact: string;
    providerEmail: string;
    providerName: string;
    providerPhone1: string;
    providerPhone2: string;
    providerRtn: string;
    providersId: number
}

export class _Storage {
    storageDescription: string;
    storageId: number;
    storageUbication: string
}

export class TypeProduct {
    typeProductId: number;
    typeProductName: string
}
