import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProducto, ProductResponse, ProductRequest } from "../interfaces/producto.interface";

@Injectable({
    providedIn: "root"
})
export class ProductoService {
    private apiUrl: string = "http://localhost:3002/bp/products";

    constructor(private http: HttpClient){}

    public getProducts(): Observable<ProductResponse> {
        return this.http.get<ProductResponse>(this.apiUrl);
    }

    public getProduct(id: string): Observable<IProducto> {
        return this.http.get<IProducto>(`${this.apiUrl}/${id}`);
    }

    public validateProduct(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/verification/${id}`);
    }

    public postProducts(request: IProducto): Observable<ProductRequest> {
        return this.http.post<ProductRequest>(this.apiUrl, request);
    }

    public putProducts(id: string, request: IProducto): Observable<ProductRequest> {
        return this.http.put<ProductRequest>(`${this.apiUrl}/${id}`, request);
    }

    public deleteProducts(id: string): Observable<ProductRequest> {
        return this.http.delete<ProductRequest>(`${this.apiUrl}/${id}`);
    }
}
