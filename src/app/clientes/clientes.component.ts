import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Clientes } from '../model/clientes';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit, AfterViewInit {
    public dataTable: DataTable;
    public clientes: Clientes[];

    constructor(private router: Router) { }

    ngOnInit() {

        this.clientes = JSON.parse(localStorage.getItem('listaclientes')) || [];

        this.dataTable = {
            headerRow: [ 'RUC', 'Nombre y Apellido', 'e-mail','editar/borrar' ],
            footerRow: [ 'RUC', 'Nombre y Apelido', 'e-mail','editar/borrar' ],
            dataRows: [
              // ['Airi Satou', 'Andrew Mike', 'Develop', 'btn-round'],
              // ['Ashton Cox', 'Alex Mike', 'Design', 'btn-simple'],
              // ['Airi Satou', 'Andrew Mike', 'Develop', 'btn-round'],
              // ['Ashton Cox', 'Alex Mike', 'Design', 'btn-simple'],
              // ['Airi Satou', 'Andrew Mike', 'Develop', 'btn-round'],
              // ['Ashton Cox', 'Alex Mike', 'Design', 'btn-simple'],
              // ['Airi Satou', 'Andrew Mike', 'Develop', 'btn-round'],
              // ['Ashton Cox', 'Alex Mike', 'Design', 'btn-simple']
            ]
         };

    }

    ngAfterViewInit() {
      $('#datatablescl').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "All"]
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Buscar Cliente",
        }

      });

      const table = $('#datatablescl').DataTable();

      // Edit record
      table.on('click', '.edit', function(e) {
        let $tr = $(this).closest('tr');
        if ($($tr).hasClass('child')) {
          $tr = $tr.prev('.parent');
        }

        var data = table.row($tr).data();
        alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        e.preventDefault();
      });

      // Delete a record
      table.on('click', '.remove', function(e) {
        const $tr = $(this).closest('tr');
        table.row($tr).remove().draw();
        e.preventDefault();
      });

      //Like record
      table.on('click', '.like', function(e) {
        alert('You clicked on Like button');
        e.preventDefault();
      });

      $('.card .material-datatables label').addClass('form-group');
    }
    
  edit(client: Clientes){
    this.router.navigate(['editarcliente/',client.ruc]);
  }

  delete(client: Clientes){
    //quitar el antiguo de la lista
    console.log('before: ',this.clientes)
    const indice = this.clientes.indexOf(client)
    if (indice > -1) {
      this.clientes.splice(indice,1)
    }
    console.log('after: ',this.clientes)
    Swal.fire({
      title: 'Eliminado!',
      text: 'Se eliminó al cliente exitosamente.',
      icon: 'success',
      customClass: {
      confirmButton: 'btn btn-warning',
      },
      buttonsStyling: false,
    }).then(() => {
        this.router.navigate(['/clientes'])
    });
    // guardamos los cambios en el local storage
    localStorage.setItem("listaclientes", JSON.stringify(this.clientes));
  }
}
