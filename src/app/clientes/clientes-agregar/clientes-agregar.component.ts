import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/model/clientes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-agregar',
  templateUrl: './clientes-agregar.component.html',
  styleUrls: ['./clientes-agregar.component.css']
})
export class ClientesAgregarComponent implements OnInit {
  cliente: Clientes = new Clientes();
  listaclientes: Clientes[] = JSON.parse(localStorage.getItem('listaclientes'))|| [];
  mensaje: string = "";
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }

  guardar(): void{
    // si los campos son válidos
    if (this.cliente.ruc && this.cliente.nombreapellido && this.cliente.email) {
      // añadir a la lista    
      this.listaclientes.push(this.cliente)
      console.log(this.listaclientes)
      // almacenar la lista en localStorage
      localStorage.setItem("listaclientes", JSON.stringify(this.listaclientes));
      this.mensaje='Agregado exitosamente'
      // imprimir mensaje
      Swal.fire({
        title: 'Registrado!',
        text: 'Se registró al nuevo cliente exitosamente.',
        icon: 'success',
        customClass: {
        confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      }).then(() => {
          this.router.navigate(['/clientes'])
      });
    }else{
      this.mensaje = "Error al registrar al cliente. Por favor vuelva a verificar los campos. ";
        Swal.fire({
          title: 'Error!',
          text: this.mensaje,
          icon: 'error',
          customClass: {
          confirmButton: 'btn btn-danger',
          },
          buttonsStyling: false,
      });
    }
  }
  
}
