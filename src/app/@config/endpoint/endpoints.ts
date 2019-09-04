/* BASE ROUTES */
export class IntegrationURIS {

public baseUrl: string;
public integrationUris: any;

constructor() {
this.baseUrl = 'http://inventory-system-ceutec.azurewebsites.net/api';
this.integrationUris = {
'base': this.baseUrl,
'products': '/Products',
'typeProducts': '/TypeProducts',
'productBrands': '/ProductBrands',
'productStorages': '/Storages',
'providers': '/Providers',
'requisition': '/Requisitions',
'cities': '/Cities',
'purchases' : '/Purchases'
		}
	}
}