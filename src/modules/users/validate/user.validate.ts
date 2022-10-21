import * as yup from "yup";
import "yup-phone";

export const UserValidate = yup.object({
  body: yup.object({
    name: yup.string().trim().required("Por favor, preencha o campo nome."),
    phone: yup
      .string()
      .max(18, "O campo de telefone deve ter 18 caracteres.")
      .required("Por favor, preencha o campo telefone."),
    cep: yup.string().max(20).required("O campo CEP é obrigatório"),
  }),
});
