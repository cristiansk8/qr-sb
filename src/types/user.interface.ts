import { ApiQR } from "./QR.interface";

export interface User{
    id: number;
    email: string
    name?: string;
    phone?: string;
    photo?:string;
    departamento?: string;
    ciudad?:       string;

    qr?:          ApiQR[];
}