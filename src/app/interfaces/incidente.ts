import { Server } from "./server";

export interface Incidente {
    server:Server,
    date:Date,
    content:string
}
