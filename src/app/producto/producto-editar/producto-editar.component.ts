import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css']
})
export class ProductoEditarComponent implements OnInit {

  codigo:Number
  nombre : String;
  precioVenta : Number;
  existencia : Number;

  constructor(
    private route :ActivatedRoute,
    private routeNavigate:Router,
  ) { }

  ngOnInit(): void {
    const routeParams=this.route.snapshot.paramMap
    
    this.obtenerProducto(Number(routeParams.get('id')))
  }
  obtenerProducto(codigoProducto:Number):void{
      const productos=JSON.parse(localStorage.getItem("productos")) || []
      let producto=productos.find((item)=>Number(item.codigo)==codigoProducto)
      console.log("..",producto.nombre)
      this.codigo=Number(producto.codigo);
      this.nombre=String(producto.nombre);
      this.precioVenta=Number(producto.precioVenta);
      this.existencia=Number(producto.existencia);
  }

  actualizarProducto():void{
    console.log("Actualizando..")
    const producto={
        codigo: this.codigo,
        nombre: this.nombre,
        precioVenta:this.precioVenta,
        existencia: this.existencia
    }
    if(! this.validarCampos()) this.showSwall(false)
    else {
      let productos=JSON.parse(localStorage.getItem("productos")) || []
      productos=productos.filter((item)=>Number(item.codigo)!=this.codigo) //obtenemos los productos distintos al que estamos buscando
      productos.push(producto)
      localStorage.setItem("productos",JSON.stringify(productos))
      this.showSwall(true)
    }
    

  }

  validarCampos():Boolean{
      if(this.nombre && this.precioVenta && this.existencia) return true 
      else return false
  }

  //volver a la pantalla de atras
  goBack(){
    setTimeout(()=>{
      this.routeNavigate.navigate(['/productoComponent'])
    },1)
  }

  //modal de exito o error
  showSwall(type:boolean){  
      if(type){
          swal.fire({
            title: "Actualizado",
            text: "Se actualizo el  producto",
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
            text: "No se actualizo el producto,verifique completar todos los campos",
            buttonsStyling: false,
            customClass:{
              confirmButton: "btn btn-info"
            }
          });
       }
    }


}
