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
  cliente: Clientes = new Clientes();
  oldcliente: Clientes  = new Clientes();
  listaclientes: Clientes[]=[];
  mensaje: string = "";
 
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.listaclientes = JSON.parse(localStorage.getItem('listaclientes')) || [];
    let nuevaLista = [... this.listaclientes];
      
    this.route.params.subscribe((params) =>{
      const ruc = +params['ruc']; // el + convierte el string id a number
      this.cliente = nuevaLista.find(cl => cl.ruc === ruc)
    });
    this.oldcliente = this.cliente;
  }

  modificar(client: Clientes): void{
    // si los campos son válidos
    if (client.ruc && client.nombreapellido && client.email && this.rucvalido(client.ruc)) {
      //quitar el antiguo de la lista
      console.log('before: ',this.listaclientes)
      const indice = this.listaclientes.indexOf(this.oldcliente)
      if (indice > -1) {
        this.listaclientes.splice(indice,1)
      }
      console.log('after: ',this.listaclientes)
      // añadir el nuevo en la lista    
      this.listaclientes.push(client)
      console.log(this.listaclientes)
      // almacenar la lista en localStorage
      localStorage.setItem("listaclientes", JSON.stringify(this.listaclientes));
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
    let storageclientes = JSON.parse(localStorage.getItem('listaclientes')) || [];
    if (storageclientes.find(cl => cl.ruc === nuevoruc) != null){
      valido = false;
    }
    return valido;
  }

}
