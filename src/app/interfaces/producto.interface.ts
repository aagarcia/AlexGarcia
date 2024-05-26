export interface IProducto {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}

export interface ProductResponse {
  data: IProducto[];
}

export interface ProductRequest {
  name: string;
  message: string;
  data: IProducto;
}
