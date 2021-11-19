// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core';
import swal from 'sweetalert2';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public dataTable: DataTable;

  ngOnInit() {
      let productos=JSON.parse(localStorage.getItem("productos")) || []
      console.log("....",productos.length)
      this.dataTable = {
          headerRow: [ 'Codigo', 'Nombre', 'Precio de Venta', 'Existencia', 'Acciones' ],
          footerRow: [ 'Codigo', 'Nombre', 'Precio de Venta', 'Existencia', 'Acciones' ],

          dataRows: JSON.parse(localStorage.getItem("productos")) || []
          
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
  //elimina un producto del localStorage
  eliminarProducto(codigo:Number):void{
    console.log("Eliminando..")  
    let productos=JSON.parse(localStorage.getItem("productos")) || []
    productos=productos.filter((item)=>Number(item.codigo)!=codigo) //obtenemos los productos distintos al que estamos eliminando
    localStorage.setItem("productos",JSON.stringify(productos))
    this.showSwall(true)
  }


  showSwall(type:boolean){  
    if(type){
        swal.fire({
          title: "Eliminado",
          text: "Se elimino el  producto",
          buttonsStyling: false,
          customClass:{
            confirmButton: "btn btn-success",
          },
          icon: "success"
      }).then((result)=>{
        this.ngOnInit()
      });
    }else{
      swal.fire({
          title: "Error",
          text: "No se elimino el producto,intentelo mas tarde",
          buttonsStyling: false,
          customClass:{
            confirmButton: "btn btn-info"
          }
        });
      }
    }
}
