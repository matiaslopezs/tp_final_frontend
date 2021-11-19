import { Component, OnInit } from '@angular/core';
import { Clientes } from '../model/clientes';
import { Venta } from '../model/venta';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  venta = new Venta();
  clientes:Clientes[] = []
  detalles = []
  detalle = {producto:"", cantidad:0, total:0};

  constructor() { }

  ngOnInit(): void {
    this.clientes = JSON.parse(localStorage.getItem('listaclientes')) || [];
    this.venta.fecha = new Date();
  }

  agregarProducto(){
    // push a copy of detalle into detalles
    this.detalles.push(Object.assign({}, this.detalle));
    this.detalle = {producto:"", cantidad:0, total:0};
    let total = 0;
    this.detalles.forEach(detalle => {
      total = total + detalle.total;
    });
    this.venta.total = total;
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
  }
}
