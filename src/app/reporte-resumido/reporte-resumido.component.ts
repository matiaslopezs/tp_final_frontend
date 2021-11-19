
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

  //campos de filtro
  cliente: String
  fechaDesde: Date
  fechaHasta:Date
  //campos del storage
  listaClientes:[]
  listaVentas:[]
  constructor() { }

  public dataTable: DataTable;
  ngOnInit() {
      this.listaVentas=JSON.parse(localStorage.getItem("ventas")) || []
      this.listaClientes=JSON.parse(localStorage.getItem("listaclientes")) || []

      this.dataTable = {
          headerRow: [ 'Ruc cliente','Cliente', 'Fecha', 'Total de Venta', 'Factura', 'Acciones' ],
          footerRow: [ 'Ruc cliente','Cliente', 'Fecha', 'Total de Venta', 'Factura', 'Acciones' ],
          dataRows:  JSON.parse(localStorage.getItem("ventas")) || [] 
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
  
  //formatear fecha
  formatearFecha(dateString:Date):String{
      const date=new Date(dateString)
      return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  }

  obtenerNombreCliente(ruc:String):String{
      let cliente : any = this.listaClientes.find( (item:any)=> item.ruc==ruc)
      if(cliente) return cliente.nombreapellido
      else return ""
  }

  //verifica que dos fechas esten en el mismo rango
  verificarRangoFecha(fechaDesde:Date,fechaHasta:Date,fecha:Date):Boolean{
    console.log(fechaDesde,fechaHasta,fecha)
    fecha.setHours(0,0,0,0)
    return fechaDesde.getTime()<= fecha.getTime() && fecha.getTime() <= fechaHasta.getTime()
  }
  //filtrado de reservas
  filtrarReservas():void{
    
    let listaFiltrada=[... this.listaVentas]
    if(this.cliente) listaFiltrada = listaFiltrada.filter((item:any)=>item.cliente == this.cliente)
    if (this.fechaDesde && this.fechaHasta){
      listaFiltrada = listaFiltrada.filter((item:any)=>this.verificarRangoFecha(this.fechaDesde,this.fechaHasta, new Date(item.fecha)))
    }
    this.dataTable.dataRows=listaFiltrada
  }
  //obtener todas las reservas
  obtenerTodos():void{
    this.dataTable.dataRows=[... this.listaVentas]
  }

  //limpiar campos
  limpiarCampos():void{
    console.log("Limpiando campos")
    this.cliente=''
    this.fechaDesde=null,
    this.fechaHasta=null
  }
}
