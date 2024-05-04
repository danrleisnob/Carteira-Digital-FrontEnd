import {z} from "zod";

export const signinSchema = z.object({
    email: z.string().min(1, "An email is mandatory").email().toLowerCase(),
    password: z.string().min(8, "The password must have at least six characters"),
})