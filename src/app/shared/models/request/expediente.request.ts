import { ExpedienteDetalleRequest } from "./expediente-detalle.request";

export type ExpedienteRequest = {

  infanteId: number;
  detalles: ExpedienteDetalleRequest[];
}
