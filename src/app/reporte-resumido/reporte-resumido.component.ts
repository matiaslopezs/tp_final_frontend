
import { Component, OnInit, AfterViewInit } from '@angular/core';


declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-reporte-resumido',
  templateUrl: './reporte-resumido.component.html',
  styleUrls: ['./reporte-resumido.component.css']
})
export class ReporteResumidoComponent implements OnInit {

  cliente: String
  fechaDesde: Date
  fechaHasta:Date
  constructor() { }

  public dataTable: DataTable;
  ngOnInit() {
      
      
      this.dataTable = {
          headerRow: [ 'Cliente', 'Fecha', 'Total de Venta', 'Factura', 'Acciones' ],
          footerRow: [ 'Cliente', 'Fecha', 'Total de Venta', 'Factura', 'Acciones' ],

          dataRows:  [
          ] //aca obtener del storage los valores
          
       };

  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    const table = $('#datatables').DataTable();
  

    $('.card .material-datatables label').addClass('form-group');
  }
  filtrarReservas():void{
    console.log("Filtrandoo")
    console.log(this.cliente,this.fechaDesde,this.fechaHasta)
  }
  obtenerTodos():void{
    console.log("Obteniendo todas las reservas")
  }
  limpiarCampos():void{
    console.log("Limpiando campos")
    this.cliente=''
    this.fechaDesde=null,
    this.fechaHasta=null
  }
}
