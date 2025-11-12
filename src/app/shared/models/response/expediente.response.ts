import { InfanteResponse } from "./infante.response";
import { ExpedienteDetalleResponse } from "./expediente-detalle.response";

export interface ExpedienteResponse {

    id: number,
    infante: InfanteResponse,
    fecha: Date,
    estado: string,
    detalles: ExpedienteDetalleResponse[]
}
