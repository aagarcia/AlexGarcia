import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProducto, ProductResponse, ProductRequest } from "../interfaces/producto.interface";

/**
 * Clase encargada de realizar las peticiones HTTP
 */
@Injectable({
    providedIn: "root"
})
export class ProductoService {

    private apiUrl: string = "http://localhost:3002/bp/products";

    constructor(private http: HttpClient){}

    /**
     * Obtiene la lista de todos los productos.
     *
     * @return {Observable<ProductResponse>} un observable que emite un objeto ProductResponse que contiene la lista de productos.
     */
    public getProducts(): Observable<ProductResponse> {
        return this.http.get<ProductResponse>(this.apiUrl);
    }

    /**
     * Obtiene el producto con el ID especificado
     * 
     * @param {string} id - El id del producto a obtener.
     * @return {Observable<IProducto>} un observable que emite el producto con el id especifico.
     */
    public getProduct(id: string): Observable<IProducto> {
        return this.http.get<IProducto>(`${this.apiUrl}/${id}`);
    }

    /**
     * Valida si un id ya existe para no volver a ser ingresado.
     *
     * @param {string} id - El id del producto a validar.
     * @return {Observable<boolean>} Un observable que emite un boolean indicando si el producto existe o no.
     */
    public validateProduct(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/verification/${id}`);
    }

    /**
     * Enviar un POST request con los datos del producto a insertar.
     *
     * @param {IProducto} request - El dato del producto a ser enviado a insertar de tipo IProducto.
     * @return {Observable<ProductRequest>} - Un observable que emite la respuesta de la API.
     */
    public postProducts(request: IProducto): Observable<ProductRequest> {
        return this.http.post<ProductRequest>(this.apiUrl, request);
    }

    /**
     * Actualiza un producto por medio de un id especifico.
     *
     * @param {string} id - El id del producto a ser actualizado.
     * @param {IProducto} request - El dato del producto a actualizar.
     * @return {Observable<ProductRequest>} - Un observable que emite la respuesta de la API.
     */
    public putProducts(id: string, request: IProducto): Observable<ProductRequest> {
        return this.http.put<ProductRequest>(`${this.apiUrl}/${id}`, request);
    }

    /**
     * Elimina el producto por el id.
     *
     * @param {string} id - El id del producto a ser eliminado.
     * @return {Observable<ProductRequest>} Un observable que emite la respuesta de la API.
     */
    public deleteProducts(id: string): Observable<ProductRequest> {
        return this.http.delete<ProductRequest>(`${this.apiUrl}/${id}`);
    }
}
