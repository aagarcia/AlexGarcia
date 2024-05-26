/**
 * Definicion de la interfaz IProducto
 * 
 * @interface IProducto
 * @property {string} id - El id del producto
 * @property {string} name - El nombre del producto
 * @property {string} description - La descripción del producto
 * @property {string} logo - El logo del producto
 * @property {Date} date_release - La fecha de lanzamiento del producto
 * @property {Date} date_revision - La fecha de revisión del producto
 */
export interface IProducto {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}

/**
 * Definicion de la interfaz ProductResponse
 * 
 * @interface ProductResponse
 * @property {IProducto[]} data - La lista de Productos
 */
export interface ProductResponse {
  data: IProducto[];
}

/**
 * Definicion de la interfaz ProductRequest
 * 
 * @interface ProductRequest
 * @property {string} name - El nombre del producto
 * @property {string} message - El mensaje de respuesta
 * @property {IProducto} data - El dato del producto
 */
export interface ProductRequest {
  name: string;
  message: string;
  data: IProducto;
}
