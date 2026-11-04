import { z } from "zod";

/**
 * Aceita um timestamp Unix (segundos ou milissegundos) ou uma data ISO 8601
 * e devolve um Date.
 */
export const timestampSchema = z
  .union([z.number().nonnegative(), z.string().datetime({ offset: true })])
  .transform((value) => {
    if (typeof value === "string") return new Date(value);
    // Abaixo de 1e12 é segundos; acima, milissegundos.
    return new Date(value < 1e12 ? value * 1000 : value);
  });
