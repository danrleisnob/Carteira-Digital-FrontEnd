import {z} from "zod";

export const signupSchema = z.object({
    name: z.string().min(3, "O nome precisa ter no minímo 3 caracteres")
        .transform((name) => {
            return name
            .trim()
            .split(" ")
            .map((word) =>{
                return word[0].toLocaleUpperCase().concat(word.substring(1));
            })
            .join(" ");
        }),
    email: z
        .string()
        .email("Email inválido")
        .min(1, "O email é obrigatório.")
        .toLowerCase(),
    password: z.string().min(8, "A senha precisa ter no minimo oito caracteres"),
    confirmpassword: z.string().min(8, "A senha precisa ter no minimo oito caracteres")
})
.refine((data) => data.password=== data.confirmpassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
});