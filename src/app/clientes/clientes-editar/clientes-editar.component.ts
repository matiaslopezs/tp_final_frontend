import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/model/clientes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-editar',
  templateUrl: './clientes-editar.component.html',
  styleUrls: ['./clientes-editar.component.css']
})
export class ClientesEditarComponent implements OnInit {
  cliente: Clientes;
  oldcliente: Clientes;
  listaclientes: Clientes[]=[];
  mensaje: string = "";
 
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      const ruc = +params['ruc']; // el + convierte el string id a number
      this.listaclientes = JSON.parse(localStorage.getItem('listaclientes')) || [];
      this.cliente = this.listaclientes.find(cl => cl.ruc === ruc);
      this.oldcliente = this.cliente;
    });
    console.log(this.listaclientes)
  }

  modificar(): void{
    // si los campos son válidos
    if (this.cliente.ruc && this.cliente.nombreapellido && this.cliente.email && this.rucvalido(this.cliente.ruc)) {
      //quitar el antiguo de la lista
      console.log('before: ',this.listaclientes)
      const indice = this.listaclientes.indexOf(this.oldcliente)
      if (indice > -1) {
        this.listaclientes.splice(indice,1)
      }
      console.log('after: ',this.listaclientes)
      // añadir el nuevo en la lista    
      this.listaclientes.push(this.cliente)
      console.log(this.listaclientes)
      // almacenar la lista en localStorage
      // localStorage.setItem("listaclientes", JSON.stringify(this.listaclientes));
      this.mensaje='Agregado exitosamente'
      // imprimir mensaje
      Swal.fire({
        title: 'Registrado!',
        text: 'El cliente ha sido editado exitosamente.',
        icon: 'success',
        customClass: {
        confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      }).then(() => {
          this.router.navigate(['/clientes'])
      });
    }else{
      this.mensaje = "Error al editar el cliente. Por favor vuelva a verificar los campos. ";
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
  rucvalido(nuevoruc) {
    let valido = true;
    // si el ruc ya existe en el array entonces no es valido
    console.log("este id ya existe: ",this.listaclientes.find(cl => cl.ruc === nuevoruc))
    if (this.listaclientes.find(cl => cl.ruc === nuevoruc) != null){
      valido = false;
    }
    return valido;
  }

}
