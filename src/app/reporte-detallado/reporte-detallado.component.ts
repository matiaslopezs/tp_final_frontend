import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-detallado',
  templateUrl: './reporte-detallado.component.html',
  styleUrls: ['./reporte-detallado.component.css']
})
export class ReporteDetalladoComponent implements OnInit {

  dateRange = [new Date(2019, 0, 1), new Date()];
  productos = []
  detalles = []
  ventas = []
  producto
  clientes

  constructor() { }

  ngOnInit(): void {
    // productos from localstorage
    this.productos = JSON.parse(localStorage.getItem('productos')) || [];
    this.clientes = JSON.parse(localStorage.getItem('listaclientes')) || [];

  }

  filtrar(){
    this.obtenerTodos();
    this.detalles = this.detalles.filter(detalle => {
      const fecha = new Date(detalle.fecha)
      return fecha >= this.dateRange[0] && fecha <= this.dateRange[1];
    })
    this.detalles = this.detalles.filter(detalle => {
      return detalle.producto == this.producto;
    })
  }

  obtenerTodos(){
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    this.detalles = []
    console.log(ventas)
    for (const venta of ventas) {
      for (const detalle of venta.detalles) {
        const cliente = this.clientes.find(cliente => cliente.ruc === venta.cliente);   
        this.detalles.push({
          cliente: cliente?.nombreapellido,
          fecha: venta.fecha,
          producto: detalle.producto,
          cantidad: detalle.cantidad,
          total: detalle.total
        })     
      }
    }
  }

}
