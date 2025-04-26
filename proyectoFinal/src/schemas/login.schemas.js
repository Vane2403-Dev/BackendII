import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Debe ser un tipo de email válido"),
  password: z.string(),
});