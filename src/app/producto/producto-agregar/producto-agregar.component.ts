import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-producto-agregar',
  templateUrl: './producto-agregar.component.html',
  styleUrls: ['./producto-agregar.component.css']
})
export class ProductoAgregarComponent implements OnInit {
  nombre : String ;
  precioVenta : Number;
  existencia : Number;

  constructor(
    private routeNavigate:Router,

  ) { }

  ngOnInit(): void {
  }

  //volver a la pantalla de atras
  goBack(){
    setTimeout(()=>{
      this.routeNavigate.navigate(['/productoComponent'])
    },1)
  }

  //crear producto
  crearProducto():void{
    console.log("Creandoo..")
    const producto={
        codigo: Date.now(),
        nombre: this.nombre,
        precioVenta:this.precioVenta,
        existencia: this.existencia
    }
    if(! this.validarCampos()) this.showSwall(false) //modal de error
    else {
      let productos=JSON.parse(localStorage.getItem("productos")) 
      if(productos) productos.push(producto)
      else productos=[producto]
      localStorage.setItem("productos",JSON.stringify(productos))
  
      this.showSwall(true) //modal de exito
    }
  }

  validarCampos():Boolean{
      if(this.nombre && this.precioVenta && this.existencia) return true 
      else return false
  }

  //modal de exito o error
  showSwall(type:boolean){
    if(type){
        swal.fire({
          title: "Creado",
          text: "Se creo un nuevo producto",
          buttonsStyling: false,
          customClass:{
            confirmButton: "btn btn-success",
          },
          icon: "success"
      }).then((result)=>{
        if(result.isConfirmed) this.goBack()
        else this.goBack()

      });
  }else{
      swal.fire({
        title: "Error",
        text: "No creeo un nuevo producto,verifique completar todos los campos",
        buttonsStyling: false,
        customClass:{
          confirmButton: "btn btn-info"
        }
      });
    }
  }

  

}
