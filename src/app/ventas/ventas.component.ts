import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Clientes } from '../model/clientes';
import { Venta } from '../model/venta';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  venta = new Venta();
  clientes:Clientes[] = [];
  detalles = [];
  productos = [];
  detalle = {producto:"", cantidad:0, total:0};

  constructor() { }

  ngOnInit(): void {
    this.clientes = JSON.parse(localStorage.getItem('listaclientes')) || [];
    this.venta.fecha = new Date();
    this.productos = JSON.parse(localStorage.getItem('productos')) || [];
  }

  agregarProducto(){
    // push a copy of detalle into detalles
    this.detalles.push(Object.assign({}, this.detalle));
    let total = 0;
    this.detalles.forEach(detalle => {
      total = total + detalle.total;
    });
    this.venta.total = total;
    this.detalle = {producto:"", cantidad:0, total:0};

    const input:any = document.getElementsByName('cantidad');
    input.item(0).value = 0;
  }

  eliminarProducto(producto){
    this.detalles.splice(this.detalles.indexOf(producto), 1);
  }

  createVenta(){
    this.venta.detalles = this.detalles;
    console.log(this.venta);
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventas.push(this.venta);
    localStorage.setItem('ventas', JSON.stringify(ventas));
    Swal.fire({
      title: 'Guardado!',
      text: 'La venta se guardo exitosamente.',
      icon: 'success',
      customClass: {
      confirmButton: 'btn btn-success',
      },
      buttonsStyling: false,
    }).then(() => {
      this.venta = new Venta();
      this.venta.fecha = new Date();
      this.detalles = [];
    });
  }

  cantidadHandler(e){
    console.log(e.target.value);
    const product = this.productos.find(producto => producto.nombre === this.detalle.producto);
    this.detalle.cantidad = e.target.value;
    this.detalle.total = this.detalle.cantidad * product?.precioVenta;

  }
}
