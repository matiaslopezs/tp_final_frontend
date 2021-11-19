import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/model/clientes';

@Component({
  selector: 'app-clientes-agregar',
  templateUrl: './clientes-agregar.component.html',
  styleUrls: ['./clientes-agregar.component.css']
})
export class ClientesAgregarComponent implements OnInit {
  cliente: Clientes = new Clientes();
  listaclientes: Clientes[] = JSON.parse(localStorage.getItem('listaclientes'))|| [];
  mensaje: string = "";
  
  constructor() { }
  
  ngOnInit(): void {
  }

  guardar(): void{
    this.listaclientes.push(this.cliente)
    console.log(this.listaclientes)
    localStorage.setItem("listaclientes", JSON.stringify(this.listaclientes));
        
    
  //  this.servicioPais.agregarPais(this.pais).subscribe(
  //    () => {
  //      this.mensaje='Agregado exitosamente'
  //    },
  //    error => console.log("error: "+error)
  //  );
  }
  
}
