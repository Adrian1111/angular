import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './index';
import { Product } from '../_models/index';

@Injectable()
export class ProductService {

    public options: RequestOptions;
    public siennsoftUrl: string;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
        var headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: headers });
        this.siennsoftUrl = 'http://recruits.siennsoft.com/api/Products/';
    }

    getProducts(): Observable<Product[]> {
        return this.http.get(this.siennsoftUrl, this.options)
            .map((response: Response) => response.json());
    }

    getProduct(id: number): Observable<Product> {
        let url = this.siennsoftUrl + id;

        return this.http.get(url, this.options)
            .map((response: Response) => response.json());
    }
    modifyProduct(model: any): Observable<any>{
        let url = this.siennsoftUrl + model.productID;

        return this.http.put(url, model, this.options)
            .map((response: Response) => response.json());
    }

      removeProduct(id: number): Observable<any>{
        let url = this.siennsoftUrl + id;
        return this.http.delete(url, this.options)
            .map((response: Response) => response.json());

      }

      addNewProduct(model: any): Observable<any>{
        return this.http.post(this.siennsoftUrl, model, this.options)
            .map((response: Response) => response.json());
      }
}
