class DetalleVenta{
    producto: string;
    cantidad: number;
    total: number;
}

export class Venta{
    // id, fecha, número de factura, cliente, total
    id: number;
    fecha: Date;
    numeroFactura: number;
    cliente: string;
    total: number;
    detalles: DetalleVenta[];
}