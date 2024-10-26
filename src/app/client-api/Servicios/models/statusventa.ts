export interface StatusVenta {
    codVenta: number;
    nombre: string;
    descripcion?: string; // nullable: true
    //ventum?: Ventum; // Referencia a Ventum, puede ser opcional
  }