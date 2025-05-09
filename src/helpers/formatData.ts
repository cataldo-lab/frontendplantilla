import { startCase } from "lodash";
import { format as formatRut } from "rut.js";
import { format as formatTempo } from "@formkit/tempo";

// Puedes definir una interfaz para los datos del usuario
interface User {
  "nombre Completo": string;
  username: string;
  rut: string;
  email?: string;
  createdAt: string | Date;
  [key: string]: any; 
}

export function formatUserData(user: User): User {
  return {
    ...user,
    "nombre completo": startCase(user.nombre),
    username: startCase(user.apellido),
    email: user.email,
    rut: formatRut(user.rut),
    createdAt: formatTempo(user.createdAt, "DD-MM-YYYY"),
  };
}

export function convertirMinusculas(obj: Record<string, any>): Record<string, any> {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].toLowerCase();
    }
  }
  return obj;
}

export function formatPostUpdate(user: User): Partial<User> {
  return {
    "nombre completo": startCase(user.nombre),
    username: startCase(user.rol),
    rut: formatRut(user.rut),
    email: user.email,
    createdAt: formatTempo(user.createdAt, "DD-MM-YYYY"),
  };
}
