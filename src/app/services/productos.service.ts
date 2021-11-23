import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';
import { resolve } from '../../../node_modules/@types/q';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productoDetalle: ProductoDescripcion[] = [];
  productosFiltrado: Producto[] = [];
  productoDetalleFiltrado: ProductoDescripcion[] = [];


  constructor(private http: HttpClient) {

    this.cargarProductos();

  }


  private cargarProductos() {

    return new Promise((resolve, reject) => {

      //this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
      this.http.get('assets/data/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });

    });

  }


  private cargarProductoDetalle() {
    
    return new Promise((resolve, reject) => {
      //this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
      this.http.get('assets/data/productos-detalle.json')
        .subscribe((resp: ProductoDescripcion[]) => {
          this.productoDetalle = resp;          
          this.cargando = false;
          resolve();
        });

    });

  }

  getProducto(id: string) {   
    if (this.productoDetalle.length === 0) {     
      // cargar productos
      this.cargarProductoDetalle().then(() => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductoDetalle(id);
        return this.productoDetalleFiltrado
      });
    } else {
      // aplicar el filtro
      this.filtrarProductoDetalle(id);
      return this.productoDetalleFiltrado
    }
  }

  buscarProducto(termino: string) {


    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos(termino);
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos(termino);
    }


  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }




  private filtrarProductoDetalle(id: string) {
    this.productoDetalleFiltrado = [];
    this.productoDetalle.forEach(prod => {
      if (prod.id.indexOf(id) >= 0) {
        this.productoDetalleFiltrado.push(prod);
      }
    });
  }

}
